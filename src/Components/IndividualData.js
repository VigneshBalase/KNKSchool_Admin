import React from 'react'

export const IndividualData = ({individualExcelData}) => {
    return (
        <>
            <th>{individualExcelData.ADMISSION_NUMBER}</th>
            <th>{individualExcelData.Student_Name}</th>
            <th>{individualExcelData.Father_Name}</th>
            <th>{individualExcelData.Mother_name}</th>
            <th>{individualExcelData.Date_of_Birth}</th>
            <th>{individualExcelData.Mobile_No}</th>
        </>
    )
}
