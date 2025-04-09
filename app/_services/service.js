export const getUniqueRecords = (attendanceList) => {
    if (!attendanceList || !Array.isArray(attendanceList)) return [];

    const uniqueRecord = [];
    const existingUser = new Set();

    attendanceList.forEach((record) => {
        if (!existingUser.has(record.studentId)) {
            existingUser.add(record.studentId);
            uniqueRecord.push(record);
        }
    });

    return uniqueRecord;
};
