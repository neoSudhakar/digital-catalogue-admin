export default function CustomTable({rowDataArr}){
    return <table>
        <thead>
            <th>Sno</th>
            <th>Type</th>
            <th>Stone Group</th>
            <th>Pcs</th>
            <th>Stone Wt</th>
            <th>UOM</th>
            <th>Actions</th>
        </thead>
        <tbody>
            {rowDataArr.map((eachRow)=>{
                return <tr>
                    <td>{eachRow["Sno"]}</td>
                    <td>{eachRow.type}</td>
                    <td>{eachRow.stoneGroup}</td>
                    <td>{eachRow.pcs}</td>
                    <td>{eachRow.stoneWt}</td>
                    <td>{eachRow["UOM"]}</td>
                    <td>{eachRow.actions}</td>
                </tr>
            })}
        </tbody>
    </table>
}