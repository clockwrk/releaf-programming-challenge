$(document).ready(function(){
    FusionCharts.ready(function () {


        var allData = [],
            productionItemsArray = [],
            productionYearArray = [],
            productionIndicatorArray = [],
            options ={
              currentYear:"2010",
              currentItem: "Cocoa",
              currentIndicator: "Area"
            },
            fusionTemplateObject = {
                 "type": "maps/nigeria",
                 "renderAt": "chartContainer",
                 "width": "600",
                 "height": "400",
                 "dataFormat": "json",
                 "dataSource": {
                     "chart": {
                         "caption": options.currentItem + " "+options.currentIndicator+" for "+options.currentYear,
                         "subcaption": options.currentYear,
                         "entityFillHoverColor": "#cccccc",
                         "numberScaleValue": "1,1000,1000",
                         "numberScaleUnit": "K,M,B",
                         "numberPrefix": "$",
                         "showLabels": "1",
                         "theme": "fint"
                     },
                     "colorrange": {
                         "minvalue": "0",
                         "startlabel": "Low",
                         "endlabel": "High",
                         "code": "#e44a00",
                         "gradient": "1",
                         "color": [
                             {
                                 "maxvalue": "56580",
                                 "displayvalue": "Average",
                                 "code": "#f8bd19"
                             },
                             {
                                 "maxvalue": "100000",
                                 "code": "#6baa01"
                             }
                         ]
                     },
                     "data": []
                 }
             };
        function setDataSet(date, item, indicator, data){
          var caption = ""+ date + " " + indicator + " by State",
              displaySet = [];
              console.log(0)
              for( var index = 0; index < data.length; index++){
                let currentRow = data[index];
                  if(currentRow.date === ""+date && currentRow.indicator === indicator && currentRow.item === ""+item){
                      currentRow.id = currentRow.state;
                      displaySet.push(currentRow);
                  }
              }
              return displaySet;
        }

    $.ajax({ 'url' : '/api/production', method: 'GET'}).done(function(response){
          allData = response;

          let setValues = setDataSet(options.year, options.item, options.indicator, allData)


          response.forEach( singleRecord => {

              if (productionItemsArray.indexOf(singleRecord.item) === -1) {
                  productionItemsArray.push(singleRecord.item)
              }
              if (productionYearArray.indexOf(singleRecord.date) === -1) {
                  productionYearArray.push(singleRecord.date)
              }
              if (productionIndicatorArray.indexOf(singleRecord.indicator) === -1) {
                  productionIndicatorArray.push(singleRecord.indicator)
              }

          });

          for(var index = 0; index < productionItemsArray.length ; index++){
            let string = productionItemsArray[index],

            $newOption = $('<option>', {
                text: string,
                id: 'option_' + string
            })

            $newOption.data('onselect', function(){
              options.currentItem = string;

              fusionTemplateObject.dataSource.data = setDataSet(options.year, options.item, options.indicator, allData);
              fusionTemplateObject.dataSource.chart.caption = options.currentItem + " "+options.currentIndicator+" for "+options.currentYear;


              console.log(fusionTemplateObject.data)
              salesByState.dispose();
              salesByState = new FusionCharts(fusionTemplateObject);
              salesByState.render();
            })

            $newOption.appendTo($('#item-options'))
          }

          for(var index = 0; index < productionYearArray.length ; index++){
            let string = productionYearArray[index],

            $newOption = $('<option>', {
                text: string,
                id: 'option_' + string
            })

            $newOption.data('onselect', function(){

              options.currentYear = string;

              fusionTemplateObject.dataSource.data = setDataSet(options.year, options.item, options.indicator, allData);
              fusionTemplateObject.dataSource.chart.caption = options.currentItem + " "+options.currentIndicator+" for "+options.currentYear;

              console.log(fusionTemplateObject.data)
              salesByState.dispose();
              salesByState = new FusionCharts(fusionTemplateObject);
              salesByState.render();
            })

            $newOption.appendTo($('#year-options'))
          }

          for(var index = 0; index < productionIndicatorArray.length ; index++){
            let string = productionIndicatorArray[index],

            $newOption = $('<option>', {
                text: string,
                id: 'option_' + string
            })

            $newOption.data('onselect', function(){
              options.currentIndicator = string;

              fusionTemplateObject.dataSource.data = setDataSet(options.year, options.item, options.indicator, allData);
              fusionTemplateObject.dataSource.chart.caption = options.currentItem + " "+options.currentIndicator+" for "+options.currentYear;

              console.log(fusionTemplateObject.data)
              salesByState.dispose();
              salesByState = new FusionCharts(fusionTemplateObject);
              salesByState.render();
            })

            $newOption.appendTo($('#indicator-options'))
          }


            fusionTemplateObject.dataSource.data = setDataSet(options.year, options.item, options.indicator, allData);
            fusionTemplateObject.dataSource.chart.caption = options.currentItem + " "+options.currentIndicator+" for "+options.currentYear;
            var salesByState = new FusionCharts(fusionTemplateObject);
            salesByState.render();

          $(document).on('change', 'select', function(e) {
              var selected = $(this).find('option:selected'),
                  handler = selected.data('onselect');
              if ( typeof handler == 'function' ) {
                  handler.call(selected, e);
              }
          });
        })
  });
});
