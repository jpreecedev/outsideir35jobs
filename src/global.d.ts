type PostAJobForm = {
  id?: string;
  jobTitle: string;
  category: 'FrontEnd' | 'FullStack';
  headOfficeLocation: string;
  selectedSkills: any[];
  rateFrom: string;
  rateTo: string;
  jobIs: string;
  frequency: string;
  currency: string;
  contractLength: string;
  companyName: string;
  jobDescription: string;
  whereToApply: string;
  experienceRequired: string;
};

type ExperienceRequired =
  | 'OneYearOrLess'
  | 'OneToTwo'
  | 'TwoToThree'
  | 'ThreeToFive'
  | 'FivePlus'
  | 'TenPlus';

type Category = 'FrontEnd' | 'FullStack';

type JobIs = 'remote' | 'onSite';

type Frequency = 'Day' | 'Hour';

type Currency = 'GBP' | 'USD' | 'EUR';

type ContractLength =
  | 'Under1Month'
  | 'OneToThree'
  | 'ThreeToSix'
  | 'SixToTwelve'
  | 'TwelvePlus';
