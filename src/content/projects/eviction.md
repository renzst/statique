---
title: "Evictions of Alachua County"
id: "f2n"
parent: "projects"
description: "My work on summarizing evictions and finding social determinants of high-evicted areas."
tags: ["housing justice", "eviction", "Gainesville", "Alachua County"]
level: 1
created: 2022-05-15
---

# Evictions of Alachua County

<div class="alert">

This is an ongoing project. More info as it comes.

</div>

At my <small>brief</small> time working at the Alachua County Labor Coalition (ACLC), I began work on researching neighborhoods and apartment complexes impacted by housing instability - evictions and foreclosures - in Gainesville and Alachua County, with the goal of doing targeted outreach in those areas. The project was much deeper than expected, so even as I left the ACLC, I continued with researching evictions in my URP 6272 class.

Using a Javascript web scraper written by a Gainesville local, I mined 20 years of eviction data from the Alachua Clerk of Court website. Using R, the (`postmastr`)[https://slu-opengis.github.io/postmastr/] and (`tidyverse`)[https://www.tidyverse.org/] ibraries, and a public E911 table for Alachua County, I normalized and geocoded 90% of the 34,000 cases.

<figure class="narrow">
    <img src="media/evictions-bg.png" alt="A map of Alachua County evictions by raw count. On the left, a legend describing the symbology."
    <figcaption>
        A map of evictions summarized by 2020 census block group, in non-normalized raw counts
    </figcaption>
</figure>

I produced a geographically weighted regression model (R-squared = 0.73) on log-transformed eviction counts. It predicts that evictions in an area are positively correlated with higher Hispanic/Latino and Black proportions, and negatively correlated with increased single-family detached housing and proportion of people with income below the poverty level. Higher weight is given to the proportion of Hispanic/Latinos and Black people in a census block group. It predicts as well a south-north increasing impact of Hispanic/Latino proportions and an east-west increasing spatial impact of Black proportions.

<a href="media/evictions-report.pdf" download>Download the final write-up</a>