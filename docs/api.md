# API

- UmbrellaClient
    - [new UmbrellaClient](#new-umbrellaclientconfig-ciscoumbrella)
    - [CiscoUmbrella.initiateUmbrella](#ciscoumbrellaintiateumbrellaconfig)

- Enforcement
    - [CiscoUmbrella.getEnforcementDomains](#ciscoumbrellagetenforcementdomainspage-limit-promise)
    - [CiscoUmbrella.addEnforcementDomains](#ciscoumbrellaaddenforcementdomainsdomains-providername-deviceversion-promise)
    - [CiscoUmbrella.deleteEnforcementDomain](#ciscoumbrelladeleteenforcementdomaindomainid-promise)

- Destination Lists
    - [CiscoUmbrella.getDestinationLists](#ciscoumbrellagetdestinationlistsorganizationid-page-limit-promise)
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
- `CiscoUmbrella` - class that allows the access of functions for Enforcement, Destination Lists, Destinations, and Organizaiton calls for Cisco Umbrella

## [Back To Top](#api)

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

## [Back To Top](#api)

---

## CiscoUmbrella.getEnforcementDomains(page?, limit?): Promise

`CiscoUmbrella.getEnforcementDomains` is a class function that returns information for cisco enforcement domains.

### Arguments:
- `page?` - Optional parameter for querying page for Enforcement domains
- `limit?` - Optional parameter for querying limit for Enforcement domains

### Examples:
```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')

const config = { ENFORCEMENT: { key: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const page = 1 || null
const limit = 100 || null

const EnforcementDomains = await CiscoUmbrella.getEnforcementDomains(page, limit)
const { data, meta } = EnforcementDomains
```

### Returns:
- `data` - Array of Enforcement domain information
    - `data[].id` - ID of Enforcement domain
    - `data[].name` - Name of Enforcement domain
    - `data[].lastSeenAt` - Date Enforcement domain was last detected by Cisco Umbrella
- `meta`- Object of pagination information
    - `meta.page` - Page which Enforcement domains were acquired from
    - `meta.limit` - Limit of how many Enforcement domains were acquired
    - `meta.prev` - Boolean if previous pages exist
    - `meta.next` - Boolean if more pages exist

## [Back To Top](#api)

---

## CiscoUmbrella.addEnforcementDomains(domains, providerName?, deviceVersion?): Promise

`CiscoUmbrella.addEnforcementDomains` is a class function that submits new domains to Cisco Enforcement.

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

## [Back To Top](#api)

---
## CiscoUmbrella.deleteEnforcementDomain(domainID): Promise

`CiscoUmbrella.deleteEnforcementDomain` is a class function that deletes a domain based on their ID from Cisco Enforcement domains.

### Arguments:
- `domainID` - ID of Enforcement domain to be deleted

### Examples:
```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')

const config = { ENFORCEMENT: { key: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const domainID = ''

const hasDeleted = await CiscoUmbrella.deleteEnforcementDomain(domainID)
```

### Returns:
- `hasDeleted` - Returns true if domain was deleted

## [Back To Top](#api)

---

## CiscoUmbrella.getDestinationLists(organizationID, page?, limit?): Promise

`CiscoUmbrella.getDestinationLists` is a class function that returns information for Cisco Destination Lists.

### Arguments:
- `organizationID` - ID of organization to acquire Destination Lists from
- `page?` - Optional parameter for querying page for Destination Lists
- `limit?` - Optional parameter for querying limit for Destination Lists

### Examples:
```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')

const config = { MANAGEMENT: { key: '', secret: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const organizationID = ''
const DestinationLists = await CiscoUmbrella.getDestinationLists(organizationID)
```

### Returns:
- `DestinationLists` - Object of Destination List information acquired from Cisco Umbrella
    - `DestinationLists.status` - Object of request information
        - `status.code` - Code of HTTP Request (200 if successul)
        - `status.text` - Text form HTTP REquest
    - `DestinationLists.meta` - Object of pagination information
        - `meta.page` - Current page Destination Lists were acquired from
        - `meta.limit` - Current limit of Destination Lists that were acquired
        - `meta.total` - Total number of Destination Lists 
    - `DestinationLists.data` - Array of objects containing information for each Destination List.
        - `data[].access` - Type of access for Destination List (allow or block)
        - `data[].bundleTypeId` - ID corresponding to the type of policy associated with list. 1 for DnsPolicy and 2 for Web Policy.
        - `data[].createdAt` - Unix timestamp that Destination List was created
        - `data[].id` - ID of Destination List
        - `data[].isGlobal` - Boolean for if list is global or organizational
        - `data[].modifiedAt` - Unix timestamp that Destination List was modified
        - `data[].name` - Name of Destination List
        - `data[].organizationId` - Organization ID that Destination List belongs to
        - `data[].thirdpartyCategoryId` - Third party Category ID for Destination List
        - `data[].isMspDefault` - Boolean for if Destination List is managed by service provider (MSP)
        - `data[].makedForDeletion` - Boolean for if Destination List is to be deleted
        - `data[].meta` - Object containing information on Destination List
            - `meta.destinationCount` - Count of total destinations in Destination List
            - `meta.domainCount` - Count of domains in Destination List 
            - `meta.ipv4Count` - Count of Ip addresses in Destination List
            - `meta.urlCount` - Count fo urls in Destination List

## [Back To Top](#api)

---

## CiscoUmbrella.getDestinationListDetails(organizationID, destinationListID): Promise

`CiscoUmbrella.getDestinationListDetails` is a class function that returns details on a Cisco Destination List.

### Arguments:
- `organizationID` - Organization ID where the Destination List was created
- `destinationListID` - ID of the Destination List created to get details from

### Examples:
```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')

const config = { MANAGEMENT: { key: '', secret: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const organizationID = ''
const destinationListID = ''

const DestinationListDetails = await CiscoUmbrella.getDestinationListDetails(organizationID, destinationListID)
```

### Returns:
- `DestinationListDetails` - Object with information of Destination List Request
    - `DestinationListDetails.data` - Object containing details of Destination List
        - `data.access` - Type of access for Destination List (allow or block)
        - `data.bundleTypeId` - ID corresponding to the type of policy associated with list. 1 for DnsPolicy and 2 for Web Policy.
        - `data.createdAt` - Unix timestamp that Destination List was created
        - `data.id` - ID of Destination List
        - `data.isGlobal` - Boolean for if list is global or organizational
        - `data.modifiedAt` - Unix timestamp that Destination List was modified
        - `data.name` - Name of Destination List
        - `data.organizationId` - Organization ID that Destination List belongs to
        - `data.thirdpartyCategoryId` - Third party Category ID for Destination List
        - `data.isMspDefault` - Boolean for if Destination List is managed by service provider (MSP)
        - `data.makedForDeletion` - Boolean for if Destination List is to be deleted
        - `data.meta` - Object containing information on Destination List
            - `meta.destinationCount` - Count of total destinations in Destination List
            - `meta.domainCount` - Count of domains in Destination List 
            - `meta.ipv4Count` - Count of Ip addresses in Destination List
            - `meta.urlCount` - Count fo urls in Destination List
    - `DestinationListDetails.status` - Object containing information of HTTP Request
        - `status.code` - Code of HTTP Request (200 if successul)
        - `status.text` - Text form HTTP REquest

## [Back To Top](#api)

---

## CiscoUmbrella.addDestinationList(organizationID, destinationListInfo): Promise

`CiscoUmbrella.addDestinationList` is a class function that creates a new Destination List.

### Arguments:
- `organizationID` - Organization ID where the Destination List was created
- `destinationListInfo` - Object with information for creating a new Destination List
    - `destinationListInfo.isDnsPolicy` - Boolean for if new Destination List should have a Umbrella DNS policy
    - `destinationListInfo.destinations` -  Array of new Destinations to be added with Destination List.
        - `destinations[].comment` - Comment for domain to be added
        - `destinations[].destination` - New URL/domain/ip address to be added


### Examples:
```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')

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
- `newDestinationList`- Object with information on Destination List
    - `newDestinationList.access` - Type of access for Destination List (allow or block)
    - `newDestinationList.bundleTypeId` - ID corresponding to the type of policy associated with list. 1 for DnsPolicy and 2 for Web Policy.
    - `newDestinationList.createdAt` - Unix timestamp that Destination List was created
    - `newDestinationList.id` - ID of Destination List
    - `newDestinationList.isGlobal` - Boolean for if list is global or organizational
    - `newDestinationList.modifiedAt` - Unix timestamp that Destination List was modified
    - `newDestinationList.name` - Name of Destination List
    - `newDestinationList.organizationId` - Organization ID that Destination List belongs to
    - `newDestinationList.thirdpartyCategoryId` - Third party Category ID for Destination List
    - `newDestinationList.isMspDefault` - Boolean for if Destination List is managed by service provider (MSP)
    - `newDestinationList.makedForDeletion` - Boolean for if Destination List is to be deleted
    - `newDestinationList.meta` - Object containing information on Destination List
        - `meta.destinationCount` - Count of total destinations in Destination List
        - `meta.domainCount` - Count of domains in Destination List 
        - `meta.ipv4Count` - Count of Ip addresses in Destination List
        - `meta.urlCount` - Count fo urls in Destination List

## [Back To Top](#api)

--- 

## CiscoUmbrella.patchDestinationList(organizationID, destinationListID, destinationListInfo): Promise

`CiscoUmbrella.patchDestinationList` is a class function for updating the name of the destination list.

### Arguments:
- `organizationID` - Organization ID where the Destination List was created
- `destinationListID` - ID of the Destination List created to update name
- `destinationListInfo` - Object containing new information for updating Destination List
    - `destinationListInfo.name` - New name for existing Destination List

### Examples
```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')

const config = { MANAGEMENT: { key: '', secret: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const organizationID = ''
const destinationListID = ''
const destinationListInfo = { name: '' }

const updatedDestinationList = await CiscoUmbrella.patchDestinationList(organizationID, destinationListID, destinationListInfo)
```

### Returns:
- `updatedDestinationList` - Object with information on updated destination list
    - `updatedDestinationList.access` - Type of access for Destination List (allow or block)
    - `updatedDestinationList.bundleTypeId` - ID corresponding to the type of policy associated with list. 1 for DnsPolicy and 2 for Web Policy.
    - `updatedDestinationList.createdAt` - Unix timestamp that Destination List was created
    - `updatedDestinationList.id` - ID of Destination List
    - `updatedDestinationList.isGlobal` - Boolean for if list is global or organizational
    - `updatedDestinationList.modifiedAt` - Unix timestamp that Destination List was modified
    - `updatedDestinationList.name` - Name of Destination List
    - `updatedDestinationList.organizationId` - Organization ID that Destination List belongs to
    - `updatedDestinationList.thirdpartyCategoryId` - Third party Category ID for Destination List
    - `updatedDestinationList.isMspDefault` - Boolean for if Destination List is managed by service provider (MSP)
    - `updatedDestinationList.makedForDeletion` - Boolean for if Destination List is to be deleted
    - `updatedDestinationList.meta` - Object containing information on Destination List
        - `meta.destinationCount` - Count of total destinations in Destination List
        - `meta.domainCount` - Count of domains in Destination List 
        - `meta.ipv4Count` - Count of Ip addresses in Destination List
        - `meta.urlCount` - Count fo urls in Destination List

## [Back To Top](#api)

--- 

## CiscoUmbrella.deleteDestinationList(organizationID, destinationListID): Promise

`CiscoUmbrella.deleteDestinationList` is a class function that deletes a destination list given the id from Cisco Umbrella.

### Arguments:
- `organizationID` - Organization ID where the Destination List was created
- `destinationListID` - ID of the Destination List to be deleted

### Examples:
```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')

const config = { MANAGEMENT: { key: '', secret: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const organizationID = ''
const destinationListID = ''

const hasDeleted = await CiscoUmbrella.deleteDestinationList(organizationID, destinationListID)
```

### Returns:
- `hasDeleted` - Boolean for if the Destination List was deleted

## [Back To Top](#api)

---

## CiscoUmbrella.getDestinations(organizationID, destinationListID, page?, limit?)

`CiscoUmbrella.getDestinations` is a class function that gets destinations from a specific list.

### Arguments:
- `organizationID` - Organization ID where the Destination List was created
- `destinationListID` - ID of the Destination List created to get details from
- `page?` - Optional parameter for querying page for Destinations
- `limit?` - Optional parameter for querying limit for Destinations

### Examples:
```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')

const config = { MANAGEMENT: { key: '', secret: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const organizationID = ''
const destinationListID = ''
const page = 1 || undefined
const limit = 100 || undefined

const Destinations = await CiscoUmbrella.getDestinations(organizationID, destinationListID)
```

### Returns:
- `Destinations` - Object with information of Destinations Request
    - `Destinations.status` - Object containing information of HTTP Request
        - `status.code` - Code of HTTP Request (200 if successul)
        - `status.text` - Text form HTTP REquest
    - `Destinations.meta`- Object containing pagination information for Destinations
        - `meta.page` - Current page Destinations were acquired from
        - `meta.limit` - Current limit of Destination that were acquired
        - `meta.total` - Total number of Destinations
    - `Destinations.data` - Array of Objects containing information on Destinations
        - `data[].id` - ID of Destination in Destination List
        - `data[].comment` - Comment acquainted with destination when created
        - `data[].createdAt` - Unix timestamp of when Destination was created
        - `data[].destination` - Destination in Destination List
        - `data[].type` - Type of Destination in Destination List

## [Back To Top](#api)

---

## CiscoUmbrella.addDestinations(organizationID, destinationListID, destinations): Promise

`CiscoUmbrella.addDestinations` is a class function that adds destnations to a specific list.

### Arguments:
- `organizationID` - Organization ID where the Destination List was created
- `destinationListID` - ID of the Destination List created to add Destinations to
- `destinations` - New Destinations to be added to Destination List
    - `destinations[].comment` - Comment for domain to be added
    - `destinations[].destination` - New URL/domain/ip address to be added

### Examples
```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')

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
- `newDestinations` - Object with information of Destinations Request
    - `newDestinations.data` - Object with information of Destination List
        - `data.access` - Type of access for Destination List (allow or block)
        - `data.bundleTypeId` - ID corresponding to the type of policy associated with list. 1 for DnsPolicy and 2 for Web Policy.
        - `data.createdAt` - Unix timestamp that Destination List was created
        - `data.id` - ID of Destination List
        - `data.isGlobal` - Boolean for if list is global or organizational
        - `data.modifiedAt` - Unix timestamp that Destination List was modified
        - `data.name` - Name of Destination List
        - `data.organizationId` - Organization ID that Destination List belongs to
        - `data.thirdpartyCategoryId` - Third party Category ID for Destination List
        - `data.isMspDefault` - Boolean for if Destination List is managed by service provider (MSP)
        - `data.makedForDeletion` - Boolean for if Destination List is to be deleted
        - `data.meta` - Object containing information on Destination List
            - `meta.destinationCount` - Count of total destinations in Destination List
            - `meta.domainCount` - Count of domains in Destination List 
            - `meta.ipv4Count` - Count of Ip addresses in Destination List
            - `meta.urlCount` - Count fo urls in Destination List
    - `newDestinations.status`- Object containing information of HTTP Request
        - `status.code` - Code of HTTP Request (200 if successul)
        - `status.text` - Text form HTTP REquest

## [Back To Top](#api)

---

## CiscoUmbrella.deleteDestinations(organizationID, destinationListID, destinations): Promise

`CiscoUmbrella.deleteDestinations` is a class function that deletes a series of destinations from a list.

### Arguments:
- `organizationID` - Organization ID where the Destination List was created
- `destinationListID` - ID of the Destination List to delete destination from
- `destinations` - Array of Objects of destinations to be deleted
    - `destinations[].destinationID` - Destination ID to delete from Destination List

### Examples:
```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')

const config = { MANAGEMENT: { key: '', secret: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const organizationID = ''
const destinationListID = ''

const destinationID = 0
const destinations = [destinationID, ...]

const updatedList = CiscoUmbrella.deleteDestinations(organizationID, destinationListID, destinations)
```

### Returns:
- `updatedList` - Object with information of delete Destinations request.
    - `updatedList.status` - Object containing information of HTTP Request
        - `status.code` - Code of HTTP Request (200 if successul)
        - `status.text` - Text form HTTP REquest
    - `updatedList.data`
        - `data.access` - Type of access for Destination List (allow or block)
        - `data.bundleTypeId` - ID corresponding to the type of policy associated with list. 1 for DnsPolicy and 2 for Web Policy.
        - `data.createdAt` - Unix timestamp that Destination List was created
        - `data.id` - ID of Destination List
        - `data.isGlobal` - Boolean for if list is global or organizational
        - `data.modifiedAt` - Unix timestamp that Destination List was modified
        - `data.name` - Name of Destination List
        - `data.organizationId` - Organization ID that Destination List belongs to
        - `data.thirdpartyCategoryId` - Third party Category ID for Destination List
        - `data.isMspDefault` - Boolean for if Destination List is managed by service provider (MSP)
        - `data.makedForDeletion` - Boolean for if Destination List is to be deleted
        - `data.meta` - Object containing information on Destination List
            - `meta.destinationCount` - Count of total destinations in Destination List
            - `meta.domainCount` - Count of domains in Destination List 
            - `meta.ipv4Count` - Count of Ip addresses in Destination List
            - `meta.urlCount` - Count fo urls in Destination List

## [Back To Top](#api)

---

## CiscoUmbrella.getOrganizations(): Promise

`CiscoUmbrella.getOrganizations` is a class function that acquires all the organizations pertaining to a set of networking keys.

### Examples:
```js
const { UmbrellaClient } = require('@jweb-development/cisco-umbrella')

const config = { NETWORKING: { key: '', secret: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const Organizations = CiscoUmbrella.getOrganizations()
```

### Returns:
- `Organizations` - Object with Organizations acquired from Cisco Umbrella.
    - `Organizations[].organizationId` - ID of organization found in Cisco Umbrella
    - `Organizations[].name` - Name of organization found in Cisco Umbrella

## [Back To Top](#api)