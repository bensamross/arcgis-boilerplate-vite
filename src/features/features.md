Feature-specific logic and components (could be feature folders)

Organize your components, hooks, and logic by features (also called domain-based structure). This helps separate code based on functionality rather than by component type, promoting better scalability and maintainability.
Example:

/features
  ├── /auth/           # Authentication-related components, hooks, reducers
  ├── /dashboard/      # Dashboard components, hooks, etc.
  └── /profile/        # Profile-related components