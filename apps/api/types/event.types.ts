export interface ReminderPlanOffset {
  offset: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  reminderPlan: ReminderPlanOffset[];
}

export interface EventsResponse {
  events: EventItem[];
}
