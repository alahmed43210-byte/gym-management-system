enum status{booked,cancelled}
enum UserRole{Member="member", Trainer="trainer"}

type Member={
memberinformation:Users;
memberID:number;
membershiptype:string;
Booked?:Bookings[];
}

type Trainer={
trainerinformation:Users;
trainerID:number;
specialization:string;
experiencetime:(number);
sessions?:ClassSessions[];
}

interface Users{
Full_Name:string;
Email:string;
Password:(string);
role:UserRole;
}

interface ClassSessions{
SessionsID:number;
Title:string;
Trainer:Trainer;
timeslot:(Date|string);
Capacity:number;
Bookings?:Bookings[];
}

interface Bookings{
BookingID:number;    
Session:ClassSessions; 
Member:Member;
Status:status; 
}

 

