export interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  category: 'weather' | 'crypto' | 'politics' | 'general';
  featured: boolean;
  imageEmoji: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'cyclone-senyar-2025',
    title: 'Cyclone Senyar: A Once-in-135-Years Weather Event Devastates Southeast Asia',
    date: '2025-12-02',
    author: 'PredictHub Weather Team',
    category: 'weather',
    featured: true,
    imageEmoji: '🌀',
    excerpt: 'An exceptionally rare tropical cyclone formed over the Malacca Strait in late November 2025, marking the first such occurrence in 135 years and causing catastrophic impacts across Malaysia, Indonesia, and Thailand.',
    content: `
# Cyclone Senyar: Historic Weather Disaster Strikes Southeast Asia

## The Unprecedented Event

In late November 2025, Cyclone Senyar formed over the Malacca Strait, marking an extraordinarily rare meteorological event—the first tropical cyclone to develop in this region in **135 years**. This once-in-a-century anomaly has had devastating consequences across Southeast Asia, particularly affecting Malaysia, Indonesia, and Thailand.

## Why Was This So Rare?

The Malacca Strait's proximity to the equator typically prevents cyclonic development due to weak Coriolis forces. However, a rare alignment of atmospheric conditions created the perfect storm:

- **Active Inter-Tropical Convergence Zone (ITCZ)**
- **Supportive equatorial waves**
- **Unusually warm sea surface temperatures**
- **Favorable wind shear patterns**

Meteorologists describe this as a "black swan event" in tropical weather systems.

## Impact on Malaysia 🇲🇾

### Flooding and Evacuations

Malaysian states bore significant impacts from Cyclone Senyar:

**Most Affected States:**
- **Perak**: Widespread river flooding
- **Kedah**: Agricultural damage and road closures
- **Kelantan**: Thousands evacuated
- **Penang**: Coastal flooding and infrastructure damage

### Infrastructure Damage

- Major highways closed due to flooding
- Power outages affecting hundreds of thousands
- Disrupted supply chains across the peninsula
- Estimated economic losses exceeding RM 2 billion

### Government Response

The Malaysian government has:
- Deployed emergency response teams
- Opened evacuation centers nationwide
- Provided aid packages to affected families
- Mobilized military for rescue operations

## Regional Devastation

### Indonesia 🇮🇩

Northern Sumatra experienced the worst impact:
- **631+ fatalities** (as of December 1)
- **472 people missing**
- **3.3 million people affected**
- **1 million evacuated**
- Entire villages destroyed by landslides
- Indonesia's deadliest disaster since the 2018 Sulawesi tsunami

### Thailand 🇹🇭

Southern provinces faced severe flooding:
- **145 fatalities reported**
- Songkhla, Phatthalung, Trang, and Nakhon Si Thammarat heavily affected
- Extensive agricultural damage
- Tourism industry significantly impacted

## Climate Change Connection

While no single weather event can be directly attributed to climate change, scientists note concerning trends:

### Rising Factors:
- **Warmer ocean temperatures** providing more energy for storms
- **Changing atmospheric patterns** allowing cyclones in unusual locations
- **Increased precipitation intensity** from warmer air
- **Sea level rise** amplifying flood impacts

### Expert Opinions

Dr. Ahmad Ibrahim, Malaysian Meteorological Department:
> "While Cyclone Senyar is extremely rare, we're seeing weather patterns shift in ways we haven't observed before. Climate change is loading the dice for more extreme events."

## Lessons Learned

### Preparedness Gaps

This disaster exposed several challenges:
1. **Early Warning Systems**: Need for better tropical cyclone monitoring near equator
2. **Infrastructure**: Drainage systems overwhelmed by extreme rainfall
3. **Evacuation Plans**: More robust emergency protocols needed
4. **Regional Coordination**: Enhanced cooperation between ASEAN nations

### Moving Forward

**Recommendations:**
- Investment in climate-resilient infrastructure
- Enhanced meteorological monitoring systems
- Improved flood management systems
- Community-based disaster preparedness programs
- Regional early warning networks

## Prediction Markets Response

### Weather-Related Markets

On PredictHub, several weather-related prediction markets have emerged:

- "Will Malaysia experience another major cyclone in 2026?" (Currently: 23% YES)
- "Will rainfall in Kuala Lumpur exceed 3000mm in 2026?" (Currently: 68% YES)
- "Will climate adaptation spending in Malaysia double by 2027?" (Currently: 42% YES)

These markets help gauge public and expert sentiment on future climate risks.

## How to Stay Safe

### Before a Storm:
✅ Monitor weather forecasts regularly
✅ Prepare emergency kits (food, water, medicine)
✅ Know your evacuation routes
✅ Secure important documents
✅ Charge devices and power banks

### During a Storm:
✅ Stay indoors and away from windows
✅ Follow official evacuation orders
✅ Avoid flooded areas
✅ Keep emergency contacts handy
✅ Monitor official channels for updates

### After a Storm:
✅ Wait for all-clear from authorities
✅ Avoid damaged structures
✅ Document damage for insurance
✅ Help neighbors in need
✅ Report emergencies immediately

## Recovery and Reconstruction

### Timeline:
- **Immediate (Weeks 1-4)**: Emergency relief and evacuation
- **Short-term (Months 1-6)**: Temporary housing and infrastructure repair
- **Medium-term (Years 1-2)**: Reconstruction and economic recovery
- **Long-term (Years 3-5)**: Climate adaptation and resilience building

### International Aid

Countries worldwide have pledged support:
- Singapore: S$5 million aid package
- China: Emergency supplies and medical teams
- Australia: Disaster response coordination
- UN: Humanitarian assistance funding

## The Path Forward

Cyclone Senyar serves as a stark reminder of nature's power and the urgent need for climate adaptation. As Southeast Asia faces an uncertain climate future, investment in:

- **Early warning systems**
- **Resilient infrastructure**
- **Community preparedness**
- **Regional cooperation**

...will be crucial for protecting lives and livelihoods.

---

## Support the Affected

To help victims of Cyclone Senyar:
- Malaysian Red Crescent Society
- UNICEF Malaysia
- Mercy Malaysia
- Direct government relief funds

---

*Stay informed. Stay prepared. Stay safe.*

**Updated:** December 6, 2025
**Sources:** Malaysian Meteorological Department, ASEAN Disaster Management, WHO, Regional News Agencies
    `,
    tags: ['Cyclone Senyar', 'Malaysia', 'Indonesia', 'Thailand', 'Weather', 'Climate Change', 'Natural Disaster', 'Southeast Asia']
  },
  {
    id: 'malaysian-monsoon-2026',
    title: 'Preparing for the 2026 Northeast Monsoon Season in Malaysia',
    date: '2025-12-06',
    author: 'Weather Analysis Team',
    category: 'weather',
    featured: false,
    imageEmoji: '🌧️',
    excerpt: 'As Malaysia enters the monsoon season, experts predict above-average rainfall. Learn how to prepare and what prediction markets are saying about the coming months.',
    content: `
# 2026 Northeast Monsoon: What to Expect in Malaysia

## Overview

The Northeast Monsoon season (typically November-March) is crucial for Malaysia's weather patterns. After the unprecedented Cyclone Senyar, authorities are taking extra precautions for the upcoming season.

## Forecasts and Predictions

### Expected Conditions:
- **Rainfall**: 20-30% above normal in east coast states
- **Temperature**: Slightly cooler, 24-28°C average
- **Flood Risk**: Elevated in Kelantan, Terengganu, Pahang
- **Wind Patterns**: Strong northeasterly winds

### High-Risk Areas:
1. Kelantan
2. Terengganu  
3. Pahang
4. Northern Johor
5. Sarawak (Western regions)

## Prediction Markets

Current market sentiment on PredictHub:

- "Will Kuala Lumpur receive >300mm rainfall in January 2026?" - **72% YES**
- "Will flood evacuation centers open in Kelantan this season?" - **89% YES**
- "Will monsoon season end before March 15, 2026?" - **34% YES**

## Stay Prepared

Monitor official channels:
- Malaysian Meteorological Department (METMalaysia)
- National Disaster Management Agency (NADMA)
- State disaster management centers
- PredictHub Weather Markets

---

*Updated daily with latest forecasts*
    `,
    tags: ['Malaysia', 'Monsoon', 'Weather Forecast', 'Flood Preparedness']
  }
];

export function getBlogPostById(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

export function getPostsByCategory(category: BlogPost['category']): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

