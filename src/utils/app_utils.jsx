export function getPartyName(value) {
    switch (value) {
        case 1:
            return "Nepal Communist Party";
        case 2:
            return "Rastriya Swatantra Party";
        case 3:
            return "Nepali Congress";
        default:
            return "UnKnown";
    }
}