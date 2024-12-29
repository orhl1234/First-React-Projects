import React, { useState, useEffect, useRef } from "react";
import './Expanse.css'

function Expanse() {
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [date, setDate] = useState("")

    // const savedNotes = localStorage.getItem("expanses");
    const [expansesArray, setExpansesArray] = useState([])
    const [isFilterShowoptions, setIsFilterShow] = useState(false)
    const [isFilteredByYear, setIsFilteredByYear] = useState(false)

    //add whats on the form and object. execute when clicked submit
    function AddNewExpanse(event) {
        event.preventDefault();
        const newExpanse = { description, amount, date };
        setExpansesArray(prevNewExpanse => [...prevNewExpanse, newExpanse])
        // clear inputs
    }
    // Display the last add expanss to the screen as a <div>
    useEffect(() => {
        localStorage.setItem("expanses", JSON.stringify(expansesArray));
    }, [expansesArray]);

    //create the the <div> of the expans details
    const ExpansesElements = expansesArray.map((expense, i) =>
        <div key={i} className="expense">
            <p>{"Expans description: " + expense.description}</p>
            <p>{"Expans amount: " + expense.amount + "$"}</p>
            <p>{"Expans date: " + expense.date}</p>
        </div>)

    function MostExpensive({ array }) {
        if (array.length == 0)
            return null
        const [mostExpensive, setMostExpensive] = useState(array[0])
        for (let i = 1; i < array.length; i++) {
            if (array[i].amount > mostExpensive.amount) {
                setMostExpensive(array[i]);
            }
        }
        return (
            <div className="expense">
                <p>{"Expense description: " + mostExpensive.description}</p>
                <p>{"Expense amount: " + mostExpensive.amount + "$"}</p>
                <p>{"Expense date: " + mostExpensive.date}</p>
            </div>
        );
    }

    // dropdown options.
    const [filteredArray, setFilteredArray] = useState([])
    const yearsOptions = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
    const filteroptions = () => {
        return (
            <div id="myDropdown" className={!isFilterShowoptions ? "dropdown-content" : "dropdown-content show"}>
                {yearsOptions.map((year) =>
                    <a onClick={() => {
                        setIsFilteredByYear(prev => true); setFilteredArray(expansesArray.filter((expense) =>
                            expense.date == year).map(filteredExpense => (
                                <div key={filteredExpense.id} className="expense">
                                    <p>{"Expense description: " + filteredExpense.description}</p>
                                    <p>{"Expense amount: " + filteredExpense.amount + "$"}</p>
                                    <p>{"Expense date: " + filteredExpense.date}</p>
                                </div>
                            ))
                        )
                    }
                    } key={year}>{year}</a>)}
            </div>)
    }

    //display dropdowns if filter is clicked
    function FilterShowOptions() {
        setIsFilterShow(prev => !prev)
    }

    return (
        <>
            <h1>Expanse App</h1>
            <form className="form-add-expanse" action="">
                <label htmlFor="description">Description</label>
                <input id="description" type="text" onChange={(event) => setDescription(event.target.value)} />
                <br /><br />
                <label htmlFor="amount">Amount</label>
                <input id="amount" type="number" onChange={(event) => setAmount(event.target.value)} />
                <br /><br />
                <label htmlFor="date">Date</label>
                <input id="date" type="text" onChange={(event) => setDate(event.target.value)} />
                <br /><br />
                <input onClick={AddNewExpanse} type="submit" value="Enter expanse"></input>
            </form>
            <div className="expenses-section">
                <h1>Your expanses</h1>
                <button onClick={FilterShowOptions}>Filter</button>
                {filteroptions()}

                {!isFilteredByYear && (
                    <div className="expanses-list">
                        <h1>List of Expanses</h1>
                        {ExpansesElements.map((item, index) => (
                            <div className="expanse-item" key={index}>
                                {item}
                            </div>
                        ))}
                    </div>
                )}

                <h1>Most Expensive</h1>
                <div className="most-expensive">
                    <MostExpensive array={expansesArray} />
                </div>

                {isFilteredByYear && (
                    <div className="expanses-list">
                        <h1>Filtered Expanses</h1>
                        {filteredArray}
                    </div>
                )}
            </div>

        </>
    );
}

export default Expanse;
