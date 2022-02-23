# Examples

- Enforcement
- Destination Lists & Destinations

## Get Destination Lists
```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')

const config = { 
    MANAGEMENT: { key: '...', secret: '...' },
    NETWORKING: { key: '...', secret: '...' },
    ENFORCEMENT: { key: '...' }
}

const CiscoUmbrella = new UmbrellaClient(config)

const getDestinationLists = async () => {
    try {
        // This call uses the networking keys to get the Organizations associated
        const Organizations = await CiscoUmbrella.getOrganizations()
        const [{ organizationId: organizationID } = {}] = Organizations
        
        if (!organizationID) { console.error('No organizationID found'); return false }

        // These are optional parameters that are used for pagination, default values provided
        const page = 1
        const limit = 100

        // This call uses the management keys to get the Destination Lists associated to the organization
        const DestinationLists = await CiscoUmbrella.getDestinationLists(organizationID, page, limit)

        if (DestinationLists && DestinationLists.status && DestinationLists.meta && DestinationLists.data) {
            return DestinationLists
        }

        console.error('Failed to acquire DestinationLists')
        return false
    } catch (err) {
        console.error(err)
        return false
    }
}

getDestinationLists()
```

## Destinations

### Get Destinations
```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')

const config = { 
    MANAGEMENT: { key: '...', secret: '...' },
    NETWORKING: { key: '...', secret: '...' },
    ENFORCEMENT: { key: '...' }
}

const CiscoUmbrella = new UmbrellaClient(config)

const getDestinations = async () => {
    try {
        // This call uses the networking keys to get the Organizations associated
        const Organizations = await CiscoUmbrella.getOrganizations()
        const [{ organizationId: organizationID } = {}] = Organizations
        
        if (!organizationID) { console.error('No organizationID found'); return false }

        // This call uses the management keys to get the Destination Lists associated to the organization
        const DestinationLists = await CiscoUmbrella.getDestinationLists(organizationID)
        const { data: [{ id: destinationListID } = {}] = [] } = DestinationLists

        if (!destinationListID) { console.error('No destinationListID found'); return false }

        const Destinations = await CiscoUmbrella.getDestinations(organizationID, destinationListID)

        if (Destinations && Destinations.status && Destinations.meta && Destinations.data) {
            return Destinations
        }

        console.error('Failed to get destinations')
        return false
    } catch (err) {
        console.error(err)
        return false;
    }
}
```

## Add Destinations

```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')

const config = { 
    MANAGEMENT: { key: '...', secret: '...' },
    NETWORKING: { key: '...', secret: '...' },
    ENFORCEMENT: { key: '...' }
}

const CiscoUmbrella = new UmbrellaClient(config)

const addDestinations = async (destinations) => {
    try {
        // This call uses the networking keys to get the Organizations associated
        const Organizations = await CiscoUmbrella.getOrganizations()
        const [{ organizationId: organizationID } = {}] = Organizations
        
        if (!organizationID) { console.error('No organizationID found'); return false }

        // This call uses the management keys to get the Destination Lists associated to the organization
        const DestinationLists = await CiscoUmbrella.getDestinationLists(organizationID)
        const { data: [{ id: destinationListID } = {}] = [] } = DestinationLists

        if (!destinationListID) { console.error('No destinationListID found'); return false }

        const Destinations = await CiscoUmbrella.getDestinations(organizationID, destinationListID)
        const { data: currentDestinations } = Destinations

        const destinationsToAdd = destinations.reduce((arr, destinationInfo) => {
            if (destinationInfo && destinationInfo.destination) {
                const destinationCheck = destinationInfo.destination.toLowerCase()
                const hasDomain = currentDestinations.find(
                    (currentDestination) => currentDestination.destination.toLowerCase().localeCompare(destinationCheck) 
                ) != null

                if (!hasDomain) {
                    arr.push({ ...destinationInfo })
                }
            }

            return arr
        }, [])

        const newDestinations = await CiscoUmbrella.addDestinations(organizationID, destinationListID, destinationsToAdd)

        if (newDestinations && newDestinations.data && newDestinations.status) {
            return newDestinations
        }

        console.error('Failed to add destinations')
        return false
    } catch (err) {
        console.error(err)
        return false
    }
}

const destinationsToAdd = [
    {
        comment: 'Ban Reddit',
        destination: 'https://reddit.com/'
    }
]

addDestinations(destinationsToAdd)
```

### Delete Destinations

```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')

const config = { 
    MANAGEMENT: { key: '...', secret: '...' },
    NETWORKING: { key: '...', secret: '...' },
    ENFORCEMENT: { key: '...' }
}

const CiscoUmbrella = new UmbrellaClient(config)

const deleteDestinations = async () => {
    try {
        // This call uses the networking keys to get the Organizations associated
        const Organizations = await CiscoUmbrella.getOrganizations()
        const [{ organizationId: organizationID } = {}] = Organizations
        
        if (!organizationID) { console.error('No organizationID found'); return false }

        // This call uses the management keys to get the Destination Lists associated to the organization
        const DestinationLists = await CiscoUmbrella.getDestinationLists(organizationID)
        const { data: [{ id: destinationListID } = {}] = [] } = DestinationLists

        if (!destinationListID) { console.error('No destinationListID found'); return false }

        const Destinations = await CiscoUmbrella.getDestinations(organizationID, destinationListID)
        const { data: [{ id: destinationID } = {}] = [] } = Destinations

        if (!destinationID) { console.error('No destinationID found'); return false }

        const updatedList = await CiscoUmbrella.deleteDestinations(organizationID, destinationListID, [destinationID])

        if (updatedList && updatedList.status && updatedList.data) {
            return updatedList
        }

        console.error('Failed to delete destination')
        return false
    } catch (err) {
        console.error(err)
        return false
    }
}
````