import { readStored, writeStored } from './utils'
export { getProfile, saveProfile, getActivities, addActivity, getStats, readiness as getReadiness, getQuestionBank, type Profile as InterviewProfile, type Project, type Activity } from './platform'
export const profileKey=(userId:string)=>`prepkite-profile-${userId}`
export const activityKey=(userId:string)=>`prepkite-activity-${userId}`
export const missionKey=(userId:string)=>`prepkite-missions-${userId}`
export const planKey=(userId:string)=>`prepkite-plan-${userId}`
export function getCompletedMissions(userId:string){return readStored<string[]>(missionKey(userId),[])}
export function getCompletedPlanDays(userId:string){return readStored<string[]>(planKey(userId),[])}
