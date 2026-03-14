# Deployment Diagram

## Objective
Describe environment topology, infrastructure placement, and runtime relationships.

## Environments
- **Local:** developer machine + dockerized dependencies
- **Dev:** shared cloud namespace for integration testing
- **Staging:** production-like stack with controlled traffic
- **Production:** multi-AZ deployment with autoscaling and managed backups

## Hosting Model
- Frontend hosted on edge-capable platform/CDN
- API + Worker containers on managed Kubernetes or equivalent
- Managed Postgres and Redis in private network
- Secret manager for credentials and encryption keys
- Observability stack (metrics/logs/traces) centralized

## Runtime Placement
- Public ingress: frontend and API gateway
- Private subnet: workers, Postgres, Redis
- Egress controls for provider API traffic

## Deployment Diagram (Mermaid)
```mermaid
flowchart TB
  subgraph Internet
    U[User Browser]
    G[Google/Provider APIs]
  end

  subgraph Cloud VPC
    CDN[CDN/Edge Frontend]
    IN[API Ingress]
    API[API Pods]
    WK[Worker Pods]
    SCH[Scheduler Pods]
    PG[(Managed Postgres)]
    RD[(Managed Redis)]
    OBS[Observability Stack]
    SEC[Secrets Manager]
  end

  U --> CDN --> IN --> API
  API --> PG
  API --> RD
  WK --> RD
  SCH --> RD
  WK --> PG
  API --> OBS
  WK --> OBS
  API --> SEC
  WK --> SEC
  API <--> G
  WK <--> G
```
