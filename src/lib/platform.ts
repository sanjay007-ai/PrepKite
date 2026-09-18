import { readStored, writeStored } from './utils'

export type Experience = 'Student / Fresher' | 'Entry-level candidate' | 'Career switcher' | 'Experienced professional'
export type Profile = {
  name: string; education: string; experience: Experience; role: string; company: string; industry: string; skills: string; projects: Project[]; linkedin?: string; naukri?: string; resumeName?: string
}
export type Project = { name: string; tools: string; description: string; contribution: string; challenge: string; result: string }
export type Activity = { id: string; type: 'attendance'|'question'|'practice'|'mock'|'coach'; label: string; timestamp: string; score?: number; skill?: string; company?: string }
export type SavedQuestion = { id: string; title: string; role: string; skill: string; category: string; company?: string; prompt: string; practical?: string }

export const roles = [
  'Software Engineer','Frontend Developer','Backend Developer','Full Stack Developer','Data Analyst','QA Engineer','Cybersecurity Analyst',
  'Finance Analyst','Accountant','Investment Analyst','Banking Associate','Credit Analyst','Business Analyst','Operations Associate',
  'Product Manager','Management Consultant','HR Specialist','Marketing Associate','Sales Executive','Customer Support Specialist','Supply Chain Analyst','Logistics Coordinator'
]
export const experiences: Experience[] = ['Student / Fresher','Entry-level candidate','Career switcher','Experienced professional']
export const industries = ['Technology','Banking & Financial Services','Consulting','E-commerce','Healthcare','Manufacturing','Telecommunications','Retail','Logistics','Other']

export const companies = [
  ['TCS','Technology & IT Services',['SQL','Excel','Python','Communication','Project discussion']],['Infosys','Technology & IT Services',['SQL','Java/Python','Cloud','Problem solving','HR']],['Wipro','Technology & IT Services',['SQL','Programming','Web basics','Projects','Behavioral']],['Accenture','Consulting & Technology',['SQL','Analytics','Case scenarios','Communication','Projects']],['Cognizant','Technology & IT Services',['SQL','Programming','Agile','Projects','HR']],['Capgemini','Consulting & Technology',['SQL','Programming','Cloud','Scenario questions','Behavioral']],['HCLTech','Technology & IT Services',['Programming','SQL','Cloud','Troubleshooting','Projects']],['IBM','Technology & Consulting',['Programming','SQL','Cloud','Problem solving','Behavioral']],['Amazon','E-commerce & Technology',['Problem solving','SQL','Data','Leadership principles','System thinking']],['Microsoft','Technology',['Problem solving','Programming','Systems','Projects','Communication']],['Google','Technology',['Problem solving','Programming','Systems','Data','Behavioral']],['Deloitte','Consulting & Professional Services',['Analytics','Excel','SQL','Case scenarios','Communication']],['EY','Professional Services',['Excel','Analytics','Business cases','Communication','Behavioral']],['PwC','Professional Services',['Excel','Analytics','Case scenarios','Communication','Business knowledge']],['KPMG','Professional Services',['Excel','Analytics','Risk','Case scenarios','Communication']],['Zoho','Software',['Programming','SQL','Web','Problem solving','Product thinking']],['Freshworks','SaaS',['Web','APIs','SQL','Customer thinking','Projects']],['Flipkart','E-commerce',['SQL','Analytics','Problem solving','Product','Business cases']],['Accenture Strategy','Consulting',['Case analysis','Analytics','Communication','Business thinking','Problem solving']],['HDFC Bank','Banking',['Banking basics','Excel','Numerical ability','Customer scenarios','Communication']],['ICICI Bank','Banking',['Banking basics','Excel','Financial products','Customer scenarios','Behavioral']],['Axis Bank','Banking',['Banking basics','Excel','Sales scenarios','Customer service','Communication']],['JPMorgan Chase','Banking & Financial Services',['SQL','Python','Finance','Risk','Problem solving']],['Goldman Sachs','Financial Services',['SQL','Python','Finance','Markets','Problem solving']],['DHL','Logistics',['Excel','Operations','Supply chain','Problem solving','Communication']],['Walmart','Retail',['SQL','Excel','Analytics','Operations','Customer scenarios']],['PayPal','Fintech',['SQL','Python','APIs','Payments','Problem solving']],['Adobe','Software',['Programming','Web','Product thinking','Projects','Problem solving']],['Oracle','Software',['SQL','Databases','Cloud','Programming','Systems']],['SAP','Enterprise Software',['ERP concepts','SQL','Business process','Analytics','Communication']]
].map(([name, industry, focus]) => ({ name: name as string, industry: industry as string, focus: focus as string[] }))

export const roleSkills: Record<string,string[]> = {
  'Data Analyst':['SQL','Excel','Python','Power BI / Tableau','Statistics','Data storytelling'],
  'Business Analyst':['SQL','Excel','Requirements','Business cases','Process analysis','Communication'],
  'Frontend Developer':['HTML','CSS','JavaScript','React','APIs','Accessibility'],
  'Backend Developer':['Programming','APIs','SQL','Databases','Authentication','Testing'],
  'Full Stack Developer':['HTML/CSS','JavaScript','React','APIs','SQL','Deployment'],
  'Software Engineer':['Programming','DSA','SQL','OOP','System design','Testing'],
  'QA Engineer':['Testing','SQL','API testing','Automation','Bug analysis','Agile'],
  'Cybersecurity Analyst':['Networking','Security fundamentals','SIEM','Threat analysis','Incident response','Linux'],
  'Finance Analyst':['Excel','Financial modeling','Accounting','SQL','Forecasting','Business analysis'],
  'Accountant':['Accounting','Excel','Tax basics','Reconciliation','Financial statements','ERP'],
  'Investment Analyst':['Financial modeling','Valuation','Excel','Markets','Research','Communication'],
  'Banking Associate':['Banking','Excel','Financial products','Risk','Customer service','Numerical ability'],
  'Credit Analyst':['Credit analysis','Financial statements','Excel','Risk','Ratios','Communication'],
  'Product Manager':['Product sense','Analytics','SQL','Prioritization','Experimentation','Communication'],
  'Management Consultant':['Case analysis','Excel','Business knowledge','Problem solving','Communication','Storytelling'],
  'HR Specialist':['Recruiting','HR operations','Excel','Communication','Policy basics','Behavioral'],
  'Marketing Associate':['Marketing fundamentals','Analytics','Excel','Content','Campaigns','Communication'],
  'Sales Executive':['Sales process','CRM','Negotiation','Customer discovery','Communication','Objection handling'],
  'Customer Support Specialist':['Communication','Troubleshooting','CRM','Customer empathy','Escalation','Product knowledge'],
  'Supply Chain Analyst':['Excel','SQL','Inventory','Forecasting','Operations','Analytics'],
  'Logistics Coordinator':['Excel','Operations','Routing','Inventory','Communication','Problem solving'],
  'Operations Associate':['Excel','Process analysis','Operations','SQL','Problem solving','Communication']
}

const skillPractical: Record<string,string> = {
  SQL:'Write a query to return the top 3 customers by total order value, handling ties and excluding cancelled orders.',
  Excel:'Build a monthly sales summary from raw orders using formulas or a PivotTable and explain how you would validate it.',
  Python:'Given a dataset with missing values and duplicate rows, show how you would clean it and verify the result.',
  HTML:'Build an accessible form with labels, validation-friendly structure, and semantic HTML.',
  CSS:'Create a responsive two-column layout that becomes one column on mobile and explain your choices.',
  JavaScript:'Given an array of transactions, calculate totals by category and explain time complexity.',
  'Power BI / Tableau':'Design a dashboard for sales performance and explain the three KPIs you would prioritize.',
  Statistics:'A conversion rate drops from 8% to 5%. Explain how you would test whether the change is meaningful.',
  Programming:'Solve a small data-structure problem, explain your approach, complexity, and edge cases.',
  APIs:'Design an endpoint for retrieving filtered interview questions and explain validation and error handling.'
}

const defaultProfile = (fallbackName:string):Profile => ({name:fallbackName,education:'',experience:'Student / Fresher',role:'Data Analyst',company:'',industry:'Technology',skills:'',projects:[],linkedin:'',naukri:'',resumeName:''})

export function getProfile(userId:string, fallbackName:string):Profile {
  const fallback = defaultProfile(fallbackName)
  const stored = readStored<Partial<Profile> | null>(`prepkite-profile-${userId}`, null)
  if (!stored || typeof stored !== 'object') return fallback
  return { ...fallback, ...stored, projects: Array.isArray(stored.projects) ? stored.projects : [] }
}
export function saveProfile(userId:string, profile:Profile){ writeStored(`prepkite-profile-${userId}`, profile) }
export function getActivities(userId:string){ return readStored<Activity[]>(`prepkite-activity-${userId}`,[]).sort((a,b)=>b.timestamp.localeCompare(a.timestamp)) }
export function addActivity(userId:string, data:Omit<Activity,'id'|'timestamp'>){ const item={...data,id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,timestamp:new Date().toISOString()}; writeStored(`prepkite-activity-${userId}`,[item,...getActivities(userId)].slice(0,250)); return item }
export function attendanceToday(userId:string){ const key=new Date().toISOString().slice(0,10); return getActivities(userId).some(a=>a.type==='attendance' && a.timestamp.slice(0,10)===key) }
export function markAttendance(userId:string){ if(!attendanceToday(userId)) addActivity(userId,{type:'attendance',label:'Daily preparation attended'}) }
export function getSaved(userId:string){ return readStored<string[]>(`prepkite-saved-${userId}`,[]) }
export function toggleSaved(userId:string,id:string){ const current=getSaved(userId); const next=current.includes(id)?current.filter(x=>x!==id):[...current,id]; writeStored(`prepkite-saved-${userId}`,next); return next.includes(id) }
export function getStats(userId:string){
  const a=getActivities(userId), days=[...new Set(a.map(x=>x.timestamp.slice(0,10)))], recent=a.filter(x=>Date.now()-new Date(x.timestamp).getTime()<=7*86400000)
  const scores=a.filter(x=>typeof x.score==='number').map(x=>x.score as number); const accuracy=scores.length?Math.round(scores.reduce((s,x)=>s+x,0)/scores.length):0
  const skillMap:Record<string,{count:number,total:number}>={}; a.forEach(x=>{if(x.skill){skillMap[x.skill]??={count:0,total:0};skillMap[x.skill].count++;skillMap[x.skill].total+=x.score??70}})
  return {activities:a,days,weeklyCount:recent.length,accuracy,attendanceDays:a.filter(x=>x.type==='attendance').length,streak:calcStreak(days),skillMap,xp:a.length*10+Math.round(scores.reduce((s,x)=>s+x,0)/10)}
}
function calcStreak(days:string[]){ let streak=0; const set=new Set(days); const d=new Date(); while(set.has(d.toISOString().slice(0,10))){streak++;d.setDate(d.getDate()-1)} return streak }
export function readiness(userId:string){ const p=getProfile(userId,''); const s=getStats(userId); const base=Math.min(92,45+s.weeklyCount*2+s.accuracy*0.15+s.attendanceDays); const skills=(roleSkills[p.role]||['Core knowledge','Communication','Problem solving','Technical practice']).map(skill=>{const k=s.skillMap[skill]; const v=k?Math.min(98,Math.round(k.total/k.count)):Math.max(45,Math.round(base-10)); return {skill,value:v,count:k?.count||0}}); return {score:Math.round(base),skills} }
export function getQuestionBank(profile:Profile):SavedQuestion[]{
  const skills=roleSkills[profile.role]||[]; const company=companies.find(c=>c.name===profile.company); const focus=[...(company?.focus||[]),...skills].filter((v,i,a)=>a.indexOf(v)===i)
  const rows:SavedQuestion[]=[]; let n=1
  for(const skill of focus){ const practical=skillPractical[skill]||`Explain a realistic ${skill} task you would solve in this role and walk through your approach, validation, and trade-offs.`; rows.push({id:`${profile.role}-${skill}-concept`,title:`Explain a core ${skill} concept you expect to use in ${profile.role}.`,role:profile.role,skill,category:'Role knowledge',prompt:`Give a concise explanation, then connect it to a real task in a ${profile.role} interview.`,practical}); rows.push({id:`${profile.role}-${skill}-practical`,title:`${skill} practical: solve a realistic interview task.`,role:profile.role,skill,category:'Practical',prompt:practical,practical}); n++ }
  rows.push({id:'project-story',title:'Walk me through your strongest project.',role:profile.role,skill:'Project',category:'Project',prompt:'Explain the problem, your contribution, technical choices, challenge, result, and what you would improve.',practical:'Expect follow-ups on architecture, data, decisions, testing, metrics, and your individual contribution.'})
  rows.push({id:'strength',title:'What is one professional strength you can prove?',role:profile.role,skill:'Behavioral',category:'Behavioral',prompt:'Give one strength, evidence, result, and what you learned.',practical:'Avoid adjectives without evidence.'})
  rows.push({id:'weakness',title:'What is one weakness you are actively improving?',role:profile.role,skill:'Behavioral',category:'Behavioral',prompt:'Name a real but manageable weakness, your improvement system, and recent evidence.',practical:'Show ownership and progress rather than a disguised strength.'})
  return rows.slice(0,42)
}
