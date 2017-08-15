$(document).ready(function() {
  FusionCharts.ready(function() {


    var allData = [],
      productionItemsArray = [],
      productionYearArray = [],
      productionIndicatorArray = [],
      options = {
        currentYear: "2010",
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
            "caption": options.currentItem + " " + options.currentIndicator + " for " + options.currentYear,
            "subcaption": options.currentYear,
            "entityFillHoverColor": "#cccccc",
            "numberPrefix": "1",
            "showLabels": "1",
            "includeNameInLabels": "1",
            "includeValueInLabels": "1",
            "useSNameInToolTip": "1",
            "theme": "fint",
            "hoverOnEmpty" : "1",
            "showEntityToolTip": "1"
          },
          "colorrange": {
            "minvalue": "0",
            "startlabel": "Low",
            "endlabel": "High",
            "code": "#e44a00",
            "gradient": "1",
            "color": [{
              "maxvalue": "100000",
              "code": "#6baa01"
            }]
          },
          "data": []
        }
      };

    function setDataSet(date, item, indicator, data) {
      console.log('Incoming array size', data.length)
      var caption = "" + date + " " + indicator + " by State",
        displaySet = [];
      for (var index = 0; index < data.length; index++) {
        let currentRow = data[index];
        if (currentRow.date === "" + date && currentRow.indicator === indicator && currentRow.item === "" + item) {
          currentRow.id = currentRow.state;
          displaySet.push(currentRow);
        }
      }
      console.log('Outgoing array size', displaySet.length)
      console.log('date:', date, 'item:', item, 'indicator:', indicator, 'data:', date);

      console.log('displaySet', displaySet);

      var jsonArray = [];
      displaySet.forEach(stateObject => {

        let stateValueObject = {
          "id": stateObject.id,
          "value": stateObject.value,
          "displayValue": stateObject.value
        };
        console.log(stateValueObject);
        jsonArray.push(stateValueObject);
      });

      return jsonArray;
    }

    $.ajax({
      'url': '/api/production',
      method: 'GET'
    }).done(function(response) {

      allData = response;

      let setValues = setDataSet(options.currentYear, options.currentItem, options.currentIndicator, response)



      response.forEach(singleRecord => {

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

      for (var index = 0; index < productionItemsArray.length; index++) {
        let string = productionItemsArray[index],

          $newOption = $('<option>', {
            text: string,
            id: 'option_' + string
          })

        $newOption.data('onselect', function(object) {

          console.log('String changed to', string);
          console.log('Looking at the object');
          console.dir(object);
          options.currentItem = string;

          fusionTemplateObject.dataSource.data = setDataSet(options.currentYear, options.currentItem, options.currentIndicator, allData);
          fusionTemplateObject.dataSource.chart.caption = options.currentItem + " " + options.currentIndicator + " for " + options.currentYear;
          fusionTemplateObject.dataSource.colorrange.color[0].maxvalue = Math.max.apply(Math, fusionTemplateObject.dataSource.data.map(function(record) {
            return record.value;
          }));
          fusionTemplateObject.dataSource.colorrange.color[0].minvalue = Math.min.apply(Math, fusionTemplateObject.dataSource.data.map(function(record) {
            return record.value;
          }));

          console.log('Checking to see if this is empty', fusionTemplateObject.dataSource)
          salesByState.dispose();
          salesByState = new FusionCharts(fusionTemplateObject);
          salesByState.render();
        })

        $newOption.appendTo($('#item-options'))
      }

      for (var index = 0; index < productionYearArray.length; index++) {
        let string = productionYearArray[index],

          $newOption = $('<option>', {
            text: string,
            id: 'option_' + string
          })

        $newOption.data('onselect', function(object) {
          console.log('String changed to', string);
          console.log('Looking at the object');
          console.dir(object);
          options.currentYear = string;

          fusionTemplateObject.dataSource.data = setDataSet(options.currentYear, options.currentItem, options.currentIndicator, allData);
          fusionTemplateObject.dataSource.chart.caption = options.currentItem + " " + options.currentIndicator + " for " + options.currentYear;
          fusionTemplateObject.dataSource.colorrange.color[0].maxvalue = Math.max.apply(Math, fusionTemplateObject.dataSource.data.map(function(record) {
            return record.value;
          }))
          fusionTemplateObject.dataSource.colorrange.color[0].minvalue = Math.min.apply(Math, fusionTemplateObject.dataSource.data.map(function(record) {
            return record.value;
          }))

          console.log('Checking to see if this is empty', fusionTemplateObject.dataSource)
          salesByState.dispose();
          salesByState = new FusionCharts(fusionTemplateObject);
          salesByState.render();
        })

        $newOption.appendTo($('#year-options'))
      }

      for (var index = 0; index < productionIndicatorArray.length; index++) {
        let string = productionIndicatorArray[index],

          $newOption = $('<option>', {
            text: string,
            id: 'option_' + string
          })

        $newOption.data('onselect', function(object) {
          console.log('String changed to', string);
          console.log('Looking at the object');
          console.dir(object);
          options.currentIndicator = string;

          fusionTemplateObject.dataSource.data = setDataSet(options.currentYear, options.currentItem, options.currentIndicator, allData);
          fusionTemplateObject.dataSource.chart.caption = options.currentItem + " " + options.currentIndicator + " for " + options.currentYear;
          fusionTemplateObject.dataSource.colorrange.color[0].maxvalue = Math.max.apply(Math, fusionTemplateObject.dataSource.data.map(function(record) {
            return record.value;
          }))
          fusionTemplateObject.dataSource.colorrange.color[0].minvalue = Math.min.apply(Math, fusionTemplateObject.dataSource.data.map(function(record) {
            return record.value;
          }))

          console.log('Checking to see if this is empty', fusionTemplateObject.dataSource)
          salesByState.dispose();
          salesByState = new FusionCharts(fusionTemplateObject);
          salesByState.render();
        })

        $newOption.appendTo($('#indicator-options'))
      }


      fusionTemplateObject.dataSource.data = setValues;
      fusionTemplateObject.dataSource.chart.caption = options.currentItem + " " + options.currentIndicator + " for " + options.currentYear;
      fusionTemplateObject.dataSource.colorrange.color[0].maxvalue = Math.max.apply(Math, fusionTemplateObject.dataSource.data.map(function(record) {
        return record.value;
      }))
      fusionTemplateObject.dataSource.colorrange.color[0].minvalue = Math.min.apply(Math, fusionTemplateObject.dataSource.data.map(function(record) {
        return record.value;
      }))
      console.log('New Fusion object', fusionTemplateObject);

      var salesByState = new FusionCharts(fusionTemplateObject);
      salesByState.render();
    });

    $(document).on('change', 'select', function(e) {
      var selected = $(this).find('option:selected'),
        handler = selected.data('onselect');
      if (typeof handler == 'function') {
        handler.call(selected, e);
      }
    });
  });
});
