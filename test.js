function assertEqualObjects(obj1, obj2, testName) {
  const keys = Object.keys(obj1);
  for (const key of keys) {
    if (obj1[key] !== obj2[key]) {
      console.error(`❌ ${testName} failed: Mismatch at ${key}. Expected ${obj2[key]}, got ${obj1[key]}`);
      return;
    }
  }
  console.log(`✅ ${testName} passed`);
}

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

// Test Case 1
const input1 = {
  '2020-01-01': 4,
  '2020-01-02': 4,
  '2020-01-03': 6,
  '2020-01-04': 8,
  '2020-01-05': 2,
  '2020-01-06': -6,
  '2020-01-07': 2,
  '2020-01-08': -2
};

const expected1 = {
  'Mon': -6,
  'Tue': 2,
  'Wed': 2,
  'Thu': 4,
  'Fri': 6,
  'Sat': 8,
  'Sun': 2
};

assertEqualObjects(solution(input1), expected1, "Test Case 1");

// Test Case 2
const input2 = {
  '2020-01-01': 6,
  '2020-01-04': 12,
  '2020-01-05': 14,
  '2020-01-06': 2,
  '2020-01-07': 4
};

const expected2 = {
  'Mon': 2,
  'Tue': 4,
  'Wed': 6,
  'Thu': 8,
  'Fri': 10,
  'Sat': 12,
  'Sun': 14
};

assertEqualObjects(solution(input2), expected2, "Test Case 2");
