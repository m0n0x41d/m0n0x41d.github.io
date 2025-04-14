import styled from "@emotion/styled";

export const StyledLanguageSwitcher = styled.a`
  display: inline-block;
  background-color: var(--secondary);
  color: var(--text-default);
  border: 1px solid var(--tertiary);
  padding: 0.5em 1em;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
  
  &:hover {
    background-color: var(--tertiary);
    color: var(--secondary);
  }
`; 