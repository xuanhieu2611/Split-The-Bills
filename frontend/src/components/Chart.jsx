import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, Tooltip, Legend, ArcElement, plugins } from "chart.js"
import Summary from "./Summary";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";

ChartJS.register(Tooltip, Legend, ArcElement);

export default function Chart() {
    const [person, setPerson] = useState([])
    const [amount, setAmount] = useState([])
    const {currentUser, state} = useAuthContext()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://split-the-bills-server.vercel.app/api/transactions/overview/${currentUser.id}`)
                setPerson(response.data.map(item => item.person))
                setAmount(response.data.map(item => item.amount))
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [state])
    
    const options = {
        responsive: true,
        plugins: {
        }
    };
    const pieData = {
        labels: person,
        datasets: [
            {
                label: "Money Spent",
                data: amount,
                backgroundColor: [
                    "#987070",
                    "#EEC759",
                    "#FF90BC",
                    "#3AA6B9",
                    "#6FDCE3",
                    "#5C2FC2",
                ],
                hoverOffset: 4,
            }
        ],
    }

  return (
    <div className="w-3/6 h-full flex flex-col items-center justify-center gap-20">
        <Summary person={person} amount={amount}/>
        <div>
            <Pie className="" options={options} data={pieData} />
        </div>
    </div>
  )
}
