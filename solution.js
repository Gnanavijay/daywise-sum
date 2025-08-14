function solution(D) {
  const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayMap = { 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0 };
  const countMap = { 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0 };

  for (const [dateStr, value] of Object.entries(D)) {
    const day = new Date(dateStr).getDay();
    const weekday = weekdayNames[day];
    dayMap[weekday] += value;
    countMap[weekday]++;
  }

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  for (let i = 0; i < weekDays.length; i++) {
    const day = weekDays[i];
    if (countMap[day] === 0) {
      let prev = i - 1;
      while (prev >= 0 && countMap[weekDays[prev]] === 0) prev--;
      let next = i + 1;
      while (next < weekDays.length && countMap[weekDays[next]] === 0) next++;

      if (prev >= 0 && next < weekDays.length) {
        dayMap[day] = Math.floor((dayMap[weekDays[prev]] + dayMap[weekDays[next]]) / 2);
      }
    }
  }

  return dayMap;
}
