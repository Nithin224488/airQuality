import { useEffect, useState } from 'react'
import { LineChart, XAxis, Tooltip, CartesianGrid, Line } from 'recharts'
import { format } from 'date-fns'
import Loader from 'react-loader-spinner'

import { PolutionDataContainer, Heading, InputContainer, Input, UnitContainer, DetailsContainer, Detail, LoaderSpinnerContainer ,Failure} from './styledComponents'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}


const PolutionData = () => {
    const [polutionData, setPolutionData] = useState([])
    const [details, setDetails] = useState({})
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
    const [toDate, setToDate] = useState('2021-10-27')
    const [limit, setLimit] = useState('500')


    const onChangeToDate = event => {
        setToDate(event.target.value)

    }

    const onChangeLimit = event => {
        if (event.key === "Enter") {
            setLimit(event.target.value)
        }

    }

    useEffect(() => {
        async function fetchData() {
            setApiStatus(apiStatusConstants.inProgress)
            const url = `https://docs.openaq.org/v2/measurements?date_from=2000-01-01T00%3A00%3A00%2B00%3A00&date_to=${toDate}T14%3A36%3A00%2B00%3A00&limit=${limit}&page=1&offset=0&sort=desc&radius=1000&country_id=US&city=Boston&order_by=datetime`
            const response = await fetch(url)
            console.log(response.ok)
            if (response.ok) {
                const data = await response.json()
                if (data.results.length === 0) {
                    setApiStatus(apiStatusConstants.failure)
                } else {
                    const details = {
                        country: data.results[0].country,
                        parameter: data.results[0].parameter,
                        city: data.results[0].city, coordinates: data.results[0].coordinates,
                        unit: data.results[0].unit
                    }

                    const formattedPolutionData = data.results.map(eachData => ({ value: eachData.value, time: format(new Date(eachData.date.local), 'dd/MMM/y H:m') }))
                    setPolutionData(formattedPolutionData)
                    setDetails(details)
                    setApiStatus(apiStatusConstants.success)
                }

            } else {
                setApiStatus(apiStatusConstants.failure)
            }

        }
        fetchData()

    }, [toDate, limit])

    const renderLoadingView = () => (
        <LoaderSpinnerContainer>
            <Loader type="TailSpin" color="#ff7300" height="80" width="80" />
        </LoaderSpinnerContainer>
    )

    const renderAirQualityDataSuccess = () => {
        const { city, country, parameter, coordinates, unit } = details
        const { latitude, longitude } = coordinates
        return (
            <>
                <UnitContainer>
                    <Detail>Unit : {unit}</Detail>
                </UnitContainer>
                <LineChart
                    width={1200}
                    height={400}
                    data={polutionData}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                    <XAxis dataKey="time" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey="value" stroke="#ff7300" yAxisId={0} />
                </LineChart>

                <DetailsContainer>
                    <div>
                        <Detail>Country : {country}</Detail>
                        <Detail>City : {city}</Detail>
                    </div>
                    <Detail>Parameter : {parameter}</Detail>
                    <div>
                        <Detail>Latitude : {latitude}&deg;</Detail>
                        <Detail>Longitude : {longitude}&deg;</Detail>
                    </div>
                </DetailsContainer>
            </>
        )
    }

    const renderFailureView = () => (
        <div>
            <Failure>Entered wrong input</Failure>
        </div>
    )

    const renderAirQualityData = () => {

        switch (apiStatus) {
            case apiStatusConstants.success:
                return renderAirQualityDataSuccess()
            case apiStatusConstants.inProgress:
                return renderLoadingView()
            case apiStatusConstants.failure:
                return renderFailureView()
            default:
                return null
        }
    }




    return (
        <PolutionDataContainer>
            <Heading>Air Quality</Heading>
            <InputContainer>
                <div>
                    <Detail>To Date :</Detail>
                    <Input type="date" onChange={onChangeToDate} />
                </div>
                <div>
                    <Detail>Limit : </Detail>
                    <Input type="number" onKeyDown={onChangeLimit} />
                </div>
            </InputContainer>
            {renderAirQualityData()}

        </PolutionDataContainer>
    )

}
export default PolutionData