// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
var jsonData;

d3.json("data/samples.json").then(function(data) {
    console.log(data);
    jsonData = data
    subjectDrop(jsonData.names)
  });

  // Create function to apply subject selection change
  function optionChanged(subject){
        console.log(subject)
        demoPop(subject)
        createGraph(subject)
  }

  // Create funtion to populate the dropdown menu
  function subjectDrop(names){
        var selector = d3.select("#selDataset")
        for (var i = 0; i < names.length; i++) {
            selector.append("option").text(names[i])
        }  
        optionChanged(names[0])

  }


  // Create function to populate the demographic information of the selected subject
  function demoPop(subject){
        console.log(subject)
        var metaData = jsonData.metadata.filter(testInfo => testInfo.id == subject)[0];
        var selector = d3.select("#sample-metadata")
        selector.html("")
        for (const [key, value] of Object.entries(metaData)) {
            selector.append("div").text(`${key}: ${value}`);
          }

  }

  // Create function to generate the graphs
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
         var otuLabels = sampleData.otu_labels.slice(0, 10).reverse();
         console.log(`Sample Values: ${sampleValues}`)
         console.log(`ID Values: ${idValues}`)

        //  Create a trace for the horizontal bar graph
         var trace1 = {
             x: sampleValues,
             y: idOTDValues,
             text: otuLabels,
             type: "bar",
             orientation: "h",
         };

         var data1 = [trace1];

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

         Plotly.newPlot("bar", data1, layout);

         // Create the trace for the bubble graph
         var trace2 = {
             x: sampleData.otu_ids,
             y: sampleData.sample_values,
             mode: "markers",
             marker: {
                 size: sampleData.sample_values,
                 color: sampleData.otu_ids
             },
             text: sampleData.otu_labels
         };

         var layout = {
             xaxis: {title: "OTU ID"},
             height: 600,
             width: 1300
         };

         var data2 = [trace2];

         Plotly.newPlot("bubble", data2, layout);

         
     }

   