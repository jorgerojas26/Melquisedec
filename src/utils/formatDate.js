import { DateTime } from 'luxon';

export default function formData(date) {
    return DateTime.fromISO(date, { setZone: true }).toFormat('F');
}
