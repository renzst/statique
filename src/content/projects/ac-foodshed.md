---
title: "Foodshed of Alachua County"
id: "ac-foodshed"
parent: "projects"
description: "My work determining food deserts and food access quotients of Alachua County and spatialized outcomes"
tags: ["food justice", "food access", "Gainesville", "Alachua County", "food desert", "food access quotient"]
level: 1
created: 2022-02-10
---

# Foodshed of Alachua County

This is a short project that maps out the locations of food deserts and areas with relatively low quality options in Alachua County, at urban scales and rural scales. This is research I undertook at the beginning of the pandemic to better understand areas Free Grocery Store would be working in, as well as a way of mapping what conventional food access points exist in the County and surrounding areas. Distances were mapped using network distances on roads, not Euclidean "crow's" distance.

## Food Deserts

A food desert as [defined by the USDA](https://www.ers.usda.gov/data-products/food-access-research-atlas/documentation/) is an area where a significant share of residents are far from a supermarket. The USDA offers more specific working definitions, but for the most part I offer relative rather than absolute pictures.

### Alachua County

At the rural scale, Waldo and Micanopy were found to be much further away from supermarkets than the county average.

<figure>
    <img src="/media/alachua_food-deserts.png" alt="A map of residential food deserts in Alachua County">
    <figcaption>
        <p>A map of residential food deserts of Alachua County at larger rural scales of 2.5 miles. Areas in black represent non-residential areas. From blue to orange to yellow represents increasing distance from a supermarket.</p>
    </figcaption>
</figure>

### Gainesville

At the urban scale, East Gainesville had the highest average distances away from supermarkets, with many areas more than 2.5 miles away from the nearest supermarket.

<figure>
    <img src="/media/gainesville_food-deserts.png" alt="A map of residential food deserts in Gainesville">
    <figcaption>
        <p>A map of residential food deserts of Gainesville at urban scales of 0.5 miles. Areas in black represent non-residential areas. From blue to orange to yellow represents increasing distance from a supermarket.</p>
        <a href="media/gainesville_food-deserts.png">See the full-resolution map</a>
    </figcaption>
</figure>

## The Foodshed

Next, I map out the relative *quality* of accessible food resources in areas. Here I define the "quality" by taking the quotient of network distance to the nearest convenience store (or similar, as long as it offers non-prepared food but not fresh fruit and vegetables) over network distance to the nearest supermarket. The quotient is relative, rather than absolute - it should be compared to the entire dataset.

Some tidbits to think about while examining these data - the absolute distance doesn't matter so much as relative distance. In the Gainesville analysis, for example, an outlying area between Tower and Parker Roads doesn't have many nearby resources by distance. However, the closest resources by far are supermarkets, not convenience stores.

### Alachua County

At the rural scale, areas across the county with low food access quotients include Waldo, Fairbanks, west Hawthorne, East Gainesville, Archer, Turkey Creek, and High Springs.

<figure>
    <img src="/media/alachua_food-access-quotient.png" alt="Food access quotients in Alachua County">
    <figcaption>
        <p>A map of food access quotients in Alachua County. Areas in black represent non-residential areas. A lower quotient (in purple) indicates that relative to the average, food access points without fruits and vegetables are much closer/more accessible than supermarkets. A higher quotient (in green) indicates the opposite.</p>
    </figcaption>

### Gainesville

At the urban scale, areas of high food access quotients include much of Northwest Gainesville and a residential area between Tower and Parker Roads in outlying West Gainesville. East Gainesville generally has a low food access quotient.

<figure>
    <img src="/media/gainesvlle_food-access-quotient.png" alt="Food access quotients in Gainesville">
    <figcaption>
        <p>A map of food access quotients focused on Gainesville. Areas in black represent non-residential areas. A lower quotient (in purple) indicates that relative to the average, food access points without fruits and vegetables are much closer/more accessible than supermarkets. A higher quotient (in green) indicates the opposite.</p>
    </figcaption>
</figure>

## Implications

Areas with food deserts or low food access quotients are areas of disinvestment. These are areas which are viewed by business and capital as unprofitable. These outcomes are either racialized or class-based. For example, East Gainesville has both high absolute distances to supermarkets and low food access quotients, meaning that the foodshed that's represented in black communities is primarily one where no fresh fruits or vegetables are available regularly. On the other hand, areas like the new Parker Road developments, while suburban in character and distances required to travel, are primarily white and affluent, so convenience stores are of low appeal while supermarkets see these areas as profitable.

Many (not all) people can travel to get fresh fruits and vegetables outside of their immediate neighborhood, so for those people physically getting to food is not the biggest problem. There is a disparity in the distances people travel, but the biggest problem is that food deserts and low food-access-quotient areas have dearths of resources accessible to them, often corresponding with other environmental factors like low physical and financial access to healthcare, more poverty, more police activity, more bail bond areas etc. All together it creates an environment that deems its residents unworthy through its forms. 