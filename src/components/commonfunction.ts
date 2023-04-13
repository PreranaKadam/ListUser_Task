//To calculate Age from DOB
export const calculateAge = (dateOfBirth: any) => {
    const dob = new Date(dateOfBirth);
    const ageDiff = Date.now() - dob.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const blockInvalidChar = (e: any) => ['0','1','2','3','4','5','6','7','8','9'].includes(e.key) && e.preventDefault();