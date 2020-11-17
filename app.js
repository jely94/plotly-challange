// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
var jsonData;

d3.json("data/samples.json").then(function(data) {
    console.log(data);
    jsonData = data
    subjectDrop(jsonData.names)
  });

  function optionChanged(subject){
        console.log(subject)
        demoPop(subject)
        createGraph(subject)
  }

  function subjectDrop(names){
        var selector = d3.select("#selDataset")
        for (var i = 0; i < names.length; i++) {
            selector.append("option").text(names[i])
        }  
        optionChanged(names[0])

  }

  function demoPop(subject){
        console.log(subject)
        var metaData = jsonData.metadata.filter(testInfo => testInfo.id == subject)[0];
        var selector = d3.select("#sample-metadata")
        selector.html("")
        for (const [key, value] of Object.entries(metaData)) {
            selector.append("div").text(`${key}: ${value}`);
          }

  }

   function createGraph(subject){
         console.log(subject)
         sampleData = jsonData.samples.filter(testData => testData.id == subject)[0];
         console.log(sampleData)
         var selector = d3.select("#bar")
         selector.html("")
         var sampleValues = sampleData.sample_values.slice(0,10).reverse();
         console.log(sampleValues)
         var idValues = (sampleData.otu_ids.slice(0, 10)).reverse();
         console.log(idValues)
         var idOTDValues = idValues.map(d => "OTU " + d)
         console.log(`OTU IDS: ${idOTDValues}`)
         var otuLabels = sampleData.otu_labels.slice(0, 10);
         console.log(`Sample Values: ${sampleValues}`)
         console.log(`ID Values: ${idValues}`)


         var trace1 = {
             x: sampleValues,
             y: idOTDValues,
             text: otuLabels,
             type: "bar",
             orientation: "h",
         };

         var data = [trace1];

         var layout = {
             title: "Top Ten OTUs",
             yaxis:{
                 tickmode: "linear",
             },
             margin: {
                 l: 100,
                 r: 100,
                 t: 30,
                 b: 20
             }
         };

         Plotly.newPlot("bar", data, layout);
     }

   