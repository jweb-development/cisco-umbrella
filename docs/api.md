# API

- [UmbrellaClient](#umbrellaclientconfig-ciscoumbrella)
    - [CiscoUmbrella.initiateUmbrella](#umbrellaclientconfig-ciscoumbrella)

- [Enforcement]()
    - [CiscoUmbrella.getEnforcementDomains](#ciscoumbrellagetenforcementdomains-enforcementdomains)
    - [CiscoUmbrella.submitEnforcementDomains](#ciscoumbrellasubmitenforcementdomainsdomains-providername-deviceversion)
    - [CiscoUmbrella.deleteEnforcementDomain]()

- [Destination Lists]()
    - [CiscoUmbrella.getDestinationLists]()
    - [CiscoUmbrella.getDestinationListDetails]()
    - [CiscoUmbrella.submitDestinationList]()
    - [CiscoUmbrella.patchDestinationList]()
    - [CiscoUmbrella.deleteDestinationList]()

- [Destinations]()
    - [CiscoUmbrella.getDestinations]()
    - [CiscoUmbrella.addDestinations]()
    - [CiscoUmbrella.deleteDestinations]()

- [Organizations]()
    - [CiscoUmbrella.getOrganizations]()

---

## UmbrellaClient(config): CiscoUmbrella

UmbrellaClient is a class that when instantiated requires configuration.

### Arguments:
- `config` an object of config keys for Cisco Umbrella
    - `MANAGEMENT` an object containing key and secret for Cisco's Management API
        - `key` string key from management credentials
        - `secret` string secret from management credentials
    - `NETWORKING` an object containing key and secret for Cisco's Networking API
        - `key` string key from networking credentials
        - `secret` string secret from networking crendetials
    - `ENFORCEMENT` an object containing key for Cisco's Enforcement API
        - `key` string key from enforcement customer key

### Examples
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

## CiscoUmbrella.getEnforcementDomains(): enforcementDomains

CiscoUmbrella.getEnforcementDomains() is a function that returns information for cisco enforcement domains.

### Examples
```js
const config = { ENFORCEMENT: { key: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const EnforcementDomains = await CiscoUmbrella.getEnforcementDomains()
const { data: [], meta: {} } = EnforcementDomains

const { page = 0, limit = 0, prev = false, next = false } = meta
const [{ id = 0, name = '', lastSeenAt = 0  }, ...] = data
```

## CiscoUmbrella.submitEnforcementDomains(domains, providerName?, deviceVersion?)

CiscoUmbrella.submitEnforcementDomains() is a function that submits new domains to cisco enforcement.

### Examples
```js
const config = { ENFORCEMENT: { key: '' } }
const CiscoUmbrella = new UmbrellaClient(config)

const EnforcementDomains = await CiscoUmbrella.submitEnforcementDomains(domains, providerName, deviceVersion)
const { id = 0 } = 
```