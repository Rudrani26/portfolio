import { skillCategories } from '../data/portfolio';

const skillById = new Map(skillCategories.flatMap((category) => category.skills).map((skill) => [skill.id, skill]));

export function getSkillName(id: string): string {
  return skillById.get(id)?.name ?? id;
}
