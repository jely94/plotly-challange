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
  }


