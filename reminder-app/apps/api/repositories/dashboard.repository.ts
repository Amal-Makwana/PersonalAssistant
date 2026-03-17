import { query } from '../lib/db.js';
import type { DashboardSummaryResponse } from '../types/event.types.js';

interface DashboardCountsRow {
  upcoming_count: string;
  needs_review_count: string;
  failed_count: string;
}

interface NextEventRow {
  id: string;
}

export class DashboardRepository {
  async getSummary(): Promise<DashboardSummaryResponse> {
    const countsResult = await query<DashboardCountsRow>(
      `SELECT
         COUNT(*) FILTER (WHERE deleted_at IS NULL AND COALESCE(event_date, start_at) >= NOW()) AS upcoming_count,
         COUNT(*) FILTER (WHERE deleted_at IS NULL AND status::text IN ('NEEDS_REVIEW', 'REVIEW_REQUIRED')) AS needs_review_count,
         COUNT(*) FILTER (WHERE deleted_at IS NULL AND status::text = 'FAILED') AS failed_count
       FROM events`
    );

    const nextResult = await query<NextEventRow>(
      `SELECT id::text
       FROM events
       WHERE deleted_at IS NULL AND COALESCE(event_date, start_at) >= NOW()
       ORDER BY COALESCE(event_date, start_at) ASC
       LIMIT 1`
    );

    const row = countsResult.rows[0] ?? { upcoming_count: '0', needs_review_count: '0', failed_count: '0' };

    return {
      upcomingCount: Number(row.upcoming_count),
      needsReviewCount: Number(row.needs_review_count),
      failedCount: Number(row.failed_count),
      nextEventId: nextResult.rows[0]?.id
    };
  }
}
