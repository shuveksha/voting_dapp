export function getCurrentState(value) {
    console.log(value);
    console.log(typeof (value));

    switch (value) {
        case 0:
            return "Not Started";
        case 1:
            return "Registration Started!";
        case 2:
            return "Registration Ended!";
        case 3:
            return "Election Started!";
        case 4:
            return "Election Ended!";
        default:
            return "";
    }
}