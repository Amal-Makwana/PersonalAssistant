# AI Development Workflow (Repository Rules)

All AI agents working in this repository must follow the documentation-first workflow.

## Mandatory Workflow

Before writing any code always read documentation in this order:

1. docs/00-product
2. docs/01-tech-spec
3. docs/02-design
4. docs/03-delivery

## Required Process

Before generating code the agent must:

1. Review documentation
2. Produce gap analysis
3. List assumptions
4. Produce implementation plan
5. Produce file-by-file plan
6. Then generate code

## Code Location Rules

Frontend:
apps/web

Backend:
apps/api

Shared packages:
packages/

Infrastructure:
infra/

## Backend Architecture

routes  
controllers  
services  
repositories  
models  

## Frontend Structure

feature-based modules  
shared UI components must go in packages/ui

## Testing

Tests must exist for core business flows.

## Scope Control

Do not invent features outside documented requirements.

If documentation is missing or unclear:
list gaps and assumptions before coding.
