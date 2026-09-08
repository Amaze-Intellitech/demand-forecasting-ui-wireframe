# Rule: Mandatory GEMINI.md Verification Gate

Always review `GEMINI.md` before generating, modifying, or refactoring code in this project.

## Invariants:
1. **Pre-Flight Check**: Never generate or edit code without actively reviewing the governing guidelines in `GEMINI.md`.
2. **Specification Adherence**: Ensure all UI implementations strictly conform to:
   - The design language (restrained neutral base, enterprise aesthetic, consistent spacing/typography).
   - The specified tech stack (React + TypeScript + Tailwind + shadcn/ui).
   - The four required screens and their explicit data models and state requirements.
3. **Architecture Preservation**: Never overwrite working project structures or introduce unauthorized dependencies.
4. **Command Execution Guardrail**: Never run `npm run build`. Always use `npm run dev` instead to start and verify the application.
