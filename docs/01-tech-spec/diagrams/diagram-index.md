# Technical Diagram Index

This index tracks architecture diagrams used by the technical specification set.

| Diagram | File | Purpose | Update Trigger |
|---|---|---|---|
| System Context | `system-context.md` | Defines system boundary, external actors/systems, and major interactions. | New external actor/system or changed integration boundary. |
| Container Diagram | `container-diagram.md` | Shows deployable runtime units and communication paths. | New service/container, queue split, or infrastructure topology change. |
| Component Diagram | `component-diagram.md` | Details key components inside frontend/backend and dependencies. | Refactor of module boundaries or addition of major domain component. |
| Deployment Diagram | `deployment-diagram.md` | Describes environment topology and infrastructure placement. | Hosting/platform/environment strategy changes. |
| Data Model Diagram | `data-model-diagram.md` | Visualizes core entities and relationships in persistence layer. | Schema migration adding/removing key entities or relationships. |
| Sequence Placeholders | `sequence-diagram-placeholders.md` | Standard sequence outlines for critical runtime flows. | Flow logic change, new integration step, or failure policy updates. |

## Governance
- Diagrams must align with markdown source documents in `docs/01-tech-spec/`.
- Any architecture-impacting change should update at least one diagram and cross-reference.
