export interface user {
    userId: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    role: string;
}

export interface SignupUser {
    confirmPassword: string;
    dob: string; 
    email: string;
    firstName: string;
    gender: "male" | "female"; 
    lastName: string;
    middleName: string;
    password: string;
    role: "patient" | "doctor";
}  

export interface Case {
    DOA: string;
    PID: number;
    case_type: string;
    category: string;
    created_at: string;
    deleted_at: string | null;
    firm_id: number;
    id: number;
    insurance_id: number;
    practice_location_id: number;
    purpose_of_visit: string;
    updated_at: string;
}

export interface speciality {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface PracticeLocation {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface AppointmentType {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface PracticeLocation {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface UserD {
    id: number;
    firstName: string;
    middleName: string | null;
    lastName: string;
    gender: string;
    email: string;
    role: string;
    dob: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Doctor {
    id: number;
    speciality_id: number;
    practice_location_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    user_id: number;
    user: UserD;
}

