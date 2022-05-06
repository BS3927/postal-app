import React from 'react'
import axios from 'axios'

export const PostalSearch = () => {
    const searchTextRef=React.useRef()
    const [opt,setOpt]=React.useState('P')
    const [result,setResult]=React.useState()

    const fnChange=(e)=>{
        setOpt(e.target.value)
    }
    const fnSearchByPin=()=>{
        const searchText=searchTextRef.current.value;
        axios.get(`https://api.postalpincode.in/pincode/${searchText}`)
        .then((res)=>{
            let result=res.data[0].PostOffice;
            if(result && result.length){
                setResult(result[0].Region)
            }else{
                setResult('Invalid Input')
            }
        })
        .catch((res)=>{
            setResult('Something went wrong')
        })
    }
    const fnSearchByBranch=()=>{
        const searchText=searchTextRef.current.value;
        axios.get(`https://api.postalpincode.in/postoffice/${searchText}`)
        .then((res)=>{
            let result=res.data[0].PostOffice;
            if(result && result.length){
                setResult(result[0].Pincode)
            }else{
                setResult('Invalid Input')
            }
        })
        .catch((res)=>{
            setResult('Something went wrong')
        })
    }
    return <div>
        <p>
            <b>Search by:</b><input value='P' checked={opt==='P'} onChange={fnChange} type="radio" name="postal"/>Pincode <input value='B' onChange={fnChange} type="radio" name="postal" />Branch Name
        </p>
        {opt==='P' ?<div>
                <p>
                    <b>Enter Pincode:</b><input ref={searchTextRef} />
                </p>
                <p>
                    <button onClick={fnSearchByPin}>Submit</button>
                </p>
            </div>
            :
            <div>
                <p>
                    <b>Enter Branch Name:</b><input ref={searchTextRef} />
                </p>
                <p>
                    <button onClick={fnSearchByBranch}>Submit</button>
                </p>
            </div>
        }
        <h3>{result}</h3>
    </div>
}
