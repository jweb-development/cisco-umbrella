# API

- UmbrellaClient
    - [new UmbrellaClient](#new-umbrellaclientconfig-ciscoumbrella)
    - [CiscoUmbrella.initiateUmbrella](#ciscoumbrellaintiateumbrellaconfig)

- Enforcement
    - [CiscoUmbrella.getEnforcementDomains](#ciscoumbrellagetenforcementdomains-promise)
    - [CiscoUmbrella.addEnforcementDomains](#ciscoumbrellaaddenforcementdomainsdomains-providername-deviceversion-promise)
    - [CiscoUmbrella.deleteEnforcementDomain](#ciscoumbrelladeleteenforcementdomaindomainid-promise)

- Destination Lists
    - [CiscoUmbrella.getDestinationLists](#ciscoumbrellagetdestinationlistsorganizationid-promise)
    - [CiscoUmbrella.getDestinationListDetails](#ciscoumbrellagetdestinationlistdetailsorganizationid-destinationlistid-promise)
    - [CiscoUmbrella.addDestinationList](#ciscoumbrellaadddestinationlistorganizationid-destinationlistinfo-promise)
    - [CiscoUmbrella.patchDestinationList](#ciscoumbrellapatchdestinationlistorganizationid-destinationlistid-destinationlistinfo-promise)
    - [CiscoUmbrella.deleteDestinationList](#ciscoumbrelladeletedestinationlistorganizationid-destinationlistid-promise)

- Destinations
    - [CiscoUmbrella.getDestinations](#ciscoumbrellagetdestinationsorganizationid-destinationlistid-page-limit)
    - [CiscoUmbrella.addDestinations](#ciscoumbrellaadddestinationsorganizationid-destinationlistid-destinations-promise)
    - [CiscoUmbrella.deleteDestinations](#ciscoumbrelladeletedestinationsorganizationid-destinationlistid-destinations-promise)

- Organizations
    - [CiscoUmbrella.getOrganizations](#ciscoumbrellagetorganizations-promise)

---

## new UmbrellaClient(config): CiscoUmbrella

`new UmbrellaClient` is a class that when instantiated requires configuration for accessing Cisco Umbrella APIs.

### Arguments:
- `config` - an object of config keys for Cisco Umbrella
    - `config.MANAGEMENT` - an object containing key and secret for Cisco's Management API
        - `MANAGEMENT.key` - string key from management credentials
        - `MANAGEMENT.secret` - string secret from management credentials
    - `config.NETWORKING` - an object containing key and secret for Cisco's Networking API
        - `NETWORKING.key` - string key from networking credentials
        - `NETWORKING.secret` - string secret from networking crendetials
    - `config.ENFORCEMENT` - an object containing key for Cisco's Enforcement API
        - `ENFORCEMENT.key` - string key from enforcement customer key

### Examples:
```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')
const config = {
    MANAGEMENT: {
        key: '',
        secret: ''
    },
    NETWORKING: {
        key: '',
        secret: ''
    },
    ENFORCEMENT: {
        key: ''
    }
}
const CiscoUmbrella = new UmbrellaClient(config)
```

### Returns:
- `CiscoUmbrella`

---

## CiscoUmbrella.intiateUmbrella(config):

`CiscoUmbrella.initiateUmbrella` is a function class that configures keys and secrets for management, enforcement, and networking APIs.

### Arguments:
- `config` - an object of config keys for Cisco Umbrella
    - `config.MANAGEMENT` - an object containing key and secret for Cisco's Management API
        - `MANAGEMENT.key` - string key from management credentials
        - `MANAGEMENT.secret` - string secret from management credentials
    - `config.NETWORKING` - an object containing key and secret for Cisco's Networking API
        - `NETWORKING.key` - string key from networking credentials
        - `NETWORKING.secret` - string secret from networking crendetials
    - `config.ENFORCEMENT` - an object containing key for Cisco's Enforcement API
        - `ENFORCEMENT.key` - string key from enforcement customer key

### Examples:
```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')
const CiscoUmbrella = new UmbrellaClient({})

const config = {
    MANAGEMENT: {
        key: '',
        secret: ''
    },
    NETWORKING: {
        key: '',
        secret: ''
    },
    ENFORCEMENT: {
        key: ''
    }
}
CiscoUmbrella.initiateUmbrella(config)
```

---

## CiscoUmbrella.getEnforcementDomains(): Promise

`CiscoUmbrella.getEnforcementDomains` is a class function that returns information for cisco enforcement domains.

### Examples:
```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')

const config = { ENFORCEMENT: { key: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const EnforcementDomains = await CiscoUmbrella.getEnforcementDomains()
const { data, meta } = EnforcementDomains
```

### Returns:
- `data`
    - `data[].id`
    - `data[].name`
    - `data[].lastSeenAt`
- `meta`
    - `meta.page`
    - `meta.limit`
    - `meta.prev`
    - `meta.next`

---

## CiscoUmbrella.addEnforcementDomains(domains, providerName?, deviceVersion?): Promise

`CiscoUmbrella.addEnforcementDomains` is a class function that submits new domains to cisco enforcement.

### Arguments:
- `domains` - an array of new domains to be added to enforcement
    - `domains[].websiteURL` - URL to be added to enforcement
    - `domains[].eventTime` - Time that event was detected 
    - `domains[].deviceID` - ID of the device where the event happened
    - `domains[].deviceVersion` - Version of the device where the event happened
- `providerName?` - optional argument for enforcement provider, defaults to "AMP"
- `deviceVersion?` - optional argument for providing device version for all new domains, defaults to "1.0a"

### Examples:
```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')

const config = { ENFORCEMENT: { key: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const providerName = ''
const deviceVersion = ''
const domains = [
    {
        websiteURL: 'www.google.com',
        eventTime: 'YYYY-MM-DDTHH:mm:ss.sssZ',
        deviceID: '',
        deviceVersion: null || ''
    },
    ...
]

const newDomains = await CiscoUmbrella.addEnforcementDomains(domains, providerName, deviceVersion)
```

### Returns:
- `newDomains` - Array of IDs added to enforcement
    - `newDomains[].id` - ID of new domain added

---
## CiscoUmbrella.deleteEnforcementDomain(domainID): Promise

`CiscoUmbrella.deleteEnforcementDomain` is a class function that deletes a domain based on their ID from cisco enforcement domains.

### Arguments:

### Examples:
```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')

const config = { ENFORCEMENT: { key: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const domainID = ''

const hasDeleted = await CiscoUmbrella.deleteEnforcementDomain(domainID)
```

### Returns:
- `hasDeleted` - returns true if domain was deleted

---

## CiscoUmbrella.getDestinationLists(organizationID): Promise

`CiscoUmbrella.getDestinationLists` is a class function that returns information for cisco destination lists.

### Arguments:
- `organizationID` - ID of organization to acquire destination lists from.

### Examples:
```js
const config = { MANAGEMENT: { key: '', secret: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const organizationID = ''
const DestinationLists = await CiscoUmbrella.getDestinationLists(organizationID)
const { meta, status, data } = DestinationLists
```

### Returns:
- `status`
    - `status.code`
    - `status.text`
- `meta`
    - `meta.page`
    - `meta.limit`
    - `meta.total`
- `data`
    - `data[].access`
    - `data[].bundleTypeId`
    - `data[].createdAt`
    - `data[].id`
    - `data[].isGlobal`
    - `data[].modifiedAt`
    - `data[].name`
    - `data[].organizationId`
    - `data[].thirdpartyCategoryId`
    - `data[].isMspDefault`
    - `data[].makedForDeletion`
    - `data[].meta`

---

## CiscoUmbrella.getDestinationListDetails(organizationID, destinationListID): Promise

`CiscoUmbrella.getDestinationListDetails` is a class function that returns details on a cisco destination list.

### Arguments:
- `organizationID`
- `destinationListID`

### Examples:
```js
const config = { MANAGEMENT: { key: '', secret: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const organizationID = ''
const destinationListID = ''

const DestinationListDetails = await CiscoUmbrella.getDestinationListDetails(organizationID, destinationListID)
const { data, status } = DestinationListDetails
```

### Returns:
- `data`
    - `data.access`
    - `data.bundleTypeId`
    - `data.createdAt`
    - `data.id`
    - `data.isGlobal`
    - `data.isMspDefault`
    - `data.markedForDeletion`
    - `data.modifiedAt`
    - `data.name`
    - `data.organizationId`
    - `data.thirdpartyCategoryId`
    - `data.meta`
- `status`
    - `status.code`
    - `status.text`

---

## CiscoUmbrella.addDestinationList(organizationID, destinationListInfo): Promise

`CiscoUmbrella.addDestinationList` is a class function that creates a new destination list.

### Arguments:
- `organizationID`
- `destinationListInfo`
    - `destinationListInfo.isDnsPolicy`
    - `destinationListInfo.destinations`
        - `destinations[].comment`
        - `destinations[].destination`


### Examples:
```js
const config = { MANAGEMENT: { key: '', secret: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const destinationListInfo = {
    access: 'allow' || 'block',
    isDnsPolicy: true || false,
    name: '',
    isGlobal: true || false,
    destinations: [
        {
            comment: '',
            destination: 'https://www.google.com' || 'x.x.x.x' || 'google.com'
        },
        ...
    ]
}

const organizationID = ''

const newDestinationList = await CiscoUmbrella.addDestinationList(organizationID, destinationListInfo)
```

### Returns:
- `newDestinationList`
    - `newDestinationList.access`
    - `newDestinationList.bundleTypeId`
    - `newDestinationList.createdAt`
    - `newDestinationList.id`
    - `newDestinationList.isGlobal`
    - `newDestinationList.isMspDefault`
    - `newDestinationList.markedForDeletion`
    - `newDestinationList.modifiedAt`
    - `newDestinationList.name`
    - `newDestinationList.organizationId`
    - `newDestinationList.thirdpartyCategoryId`
    - `newDestinationList.meta`
        - `meta.destinationCount`
        - `meta.domainCount`
        - `meta.ipv4Count`
        - `meta.urlCount`

--- 

## CiscoUmbrella.patchDestinationList(organizationID, destinationListID, destinationListInfo): Promise

`CiscoUmbrella.patchDestinationList` is a class function for updating the name of the destination list.

### Arguments:
- `organizationID`
- `destinationListID`
- `destinationListInfo`
    - `destinationListInfo.name`

### Examples
```js
const config = { MANAGEMENT: { key: '', secret: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const organizationID = ''
const destinationListID = ''
const destinationListInfo = { name: '' }

const data = await CiscoUmbrella.patchDestinationList(organizationID, destinationListID, destinationListInfo)
```

### Returns:
- `updatedDestinationList`
    - `updatedDestinationList.access`
    - `updatedDestinationList.bundleTypeId`
    - `updatedDestinationList.createdAt`
    - `updatedDestinationList.id`
    - `updatedDestinationList.isGlobal`
    - `updatedDestinationList.isMspDefault`
    - `updatedDestinationList.markedForDeletion`
    - `updatedDestinationList.modifiedAt`
    - `updatedDestinationList.name`
    - `updatedDestinationList.organizationId`
    - `updatedDestinationList.thirdpartyCategoryId`
    - `updatedDestinationList.meta`
        - `meta.destinationCount`
        - `meta.domainCount`
        - `meta.ipv4Count`
        - `meta.urlCount`

--- 

## CiscoUmbrella.deleteDestinationList(organizationID, destinationListID): Promise

`CiscoUmbrella.deleteDestinationList` is a class function that deletes a destination list given the id from cisco umbrella.

### Arguments:
- `organizationID`
- `destinationListID`

### Examples:
```js
const config = { MANAGEMENT: { key: '', secret: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const organizationID = ''
const destinationListID = ''

const hasDeleted = await CiscoUmbrella.deleteDestinationList(organizationID, destinationListID)
```

### Returns:
- `hasDeleted`

---

## CiscoUmbrella.getDestinations(organizationID, destinationListID, page, limit)

`CiscoUmbrella.getDestinations` is a class function that gets destinations from a specific list.

### Arguments:
- `organizationID`
- `destinationListID`
- `page`
- `limit`

### Examples:
```js
const config = { MANAGEMENT: { key: '', secret: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const organizationID = ''
const destinationListID = ''
const page = 1 || null
const limit = 100 || null

const Destinations = await CiscoUmbrella.getDestinations(organizationID, destinationListID)
```

### Returns:
- `status`
    - `status.code`
    - `status.text`
- `meta`
    - `meta.page`
    - `meta.limit`
    - `meta.total`
- `data`
    - `data[].id`
    - `data[].comment`
    - `data[].createdAt`
    - `data[].destination`
    - `data[].type`

---

## CiscoUmbrella.addDestinations(organizationID, destinationListID, destinations): Promise

`CiscoUmbrella.addDestinations` is a class function that adds destnations to a specific list.

### Arguments:
- `organizationID`
- `destinationListID`
- `destinations`
    - `destinations[].comment`
    - `destinations[].destination`

### Examples
```js
const config = { MANAGEMENT: { key: '', secret: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const organizationID = ''
const destinationListID = ''

const destinations = [
    {
        comment: '',
        destination: 'https://www.google.com' || 'x.x.x.x' || 'google.com'
    }
]

const newDestinations = CiscoUmbrella.addDestinations(organizationID, destinationListID, destinations)
```

### Returns:
- `newDestinations`
    - `newDestinations.data`
        - `data.access`
        - `data.bundleTypeId`
        - `data.createdAt`
        - `data.id`
        - `data.isGlobal`
        - `data.isMspDefault`
        - `data.markedForDeletion`
        - `data.modifiedAt`
        - `data.name`
        - `data.organizationId`
        - `data.thirdpartyCategoryId`
        - `data.meta`
            - `meta.destinationCount`
            - `meta.domainCount`
            - `meta.ipv4Count`
            - `meta.urlCount`
    - `newDestinations.status`
        - `status.code`
        - `status.text`

---

## CiscoUmbrella.deleteDestinations(organizationID, destinationListID, destinations): Promise

`CiscoUmbrella.deleteDestinations` is a class function that deletes a series of destinations from a list.

### Arguments:
- `organizationID`
- `destinationListID`
- `destinations`
    - `destinations[].destinationID`

### Examples:
```js
const config = { MANAGEMENT: { key: '', secret: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const organizationID = ''
const destinationListID = ''

const destinationID = 0
const destinations = [destinationID, ...]

const updatedList = CiscoUmbrella.deleteDestinations(organizationID, destinationListID, destinations)
```

### Returns:
- `updatedList`
    - `updatedList.status`
        - `status.code`
        - `status.text`
    - `updatedList.data`
        - `data.access`
        - `data.bundleTypeId`
        - `data.createdAt`
        - `data.id`
        - `data.isGlobal`
        - `data.isMspDefault`
        - `data.markedForDeletion`
        - `data.modifiedAt`
        - `data.name`
        - `data.organizationId`
        - `data.thirdpartyCategoryId`
        - `data.meta`
            - `meta.destinationCount`
            - `meta.domainCount`
            - `meta.ipv4Count`
            - `meta.urlCount`

---

## CiscoUmbrella.getOrganizations(): Promise

`CiscoUmbrella.getOrganizations` is a class function that acquires all the organizations pertaining to a set of networking keys.

### Examples:
```js
const config = { NETWORKING: { key: '', secret: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const Organizations = CiscoUmbrella.getOrganizations()
```

### Returns:
- `Organizations`
    - `Organizations[].organizationId`
    - `Organizations[].name`