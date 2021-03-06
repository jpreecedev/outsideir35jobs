declare const google: any;

interface Job {
  id?: string;
  jobTitle: string;
  category: 'FrontEnd' | 'FullStack';
  headOfficeLocation: string;
  skills: Skill[];
  rateFrom: string;
  rateTo: string;
  jobIs: JobIs;
  frequency: Frequency;
  currency: Currency;
  contractLength: ContractLength;
  companyName: string;
  jobDescription: string;
  whereToApply: string;
  experienceRequired: ExperienceRequired;
  created: Date;
  expires: Date;
}

type ExperienceRequired =
  | 'OneYearOrLess'
  | 'OneToTwo'
  | 'TwoToThree'
  | 'ThreeToFive'
  | 'FivePlus'
  | 'TenPlus';

type Category = 'FrontEnd' | 'FullStack';

type JobIs = 'remote' | 'onSite' | 'both';

type Frequency = 'Day' | 'Hour';

type Currency = 'GBP' | 'USD' | 'EUR';

type ContractLength =
  | 'Under1Month'
  | 'OneToThree'
  | 'ThreeToSix'
  | 'SixToTwelve'
  | 'TwelvePlus';

type Skill = {
  id: number;
  itemName: string;
  display: string;
};
