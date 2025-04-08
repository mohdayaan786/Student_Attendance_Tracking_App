"use client";
import React, { useEffect, useState } from "react";
import Global_api from "../_services/Global_api";

function GradeSelect({ selectedGrade }) {
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetAllGradeList();
    }, []);

    const GetAllGradeList = async () => {
        try {
            const resp = await Global_api.GetAllGrades();
            setGrades(resp.data);
        } catch (error) {
            console.error("Error fetching grades:", error);
            setGrades([]); // Handle failure gracefully
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <select
                className="p-2 border rounded-lg"
                onChange={(e) => selectedGrade(e.target.value)}
            >
                <option value="">Select Grade</option> {/* Ensure an initial value */}
                {grades.length > 0 ? (
                    grades.map((item, index) => (
                        <option key={index} value={item.grade}>
                            {item.grade}
                        </option>
                    ))
                ) : (
                    <option disabled>Loading...</option>
                )}
            </select>
        </div>
    );
}

export default GradeSelect;
