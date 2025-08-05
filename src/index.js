import { render } from 'react-dom';
import './index.css';
import * as React from 'react';
import { Ajax } from '@syncfusion/ej2-base';
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { SampleBase } from './sample-base';
import axios from 'axios';
import dataSource from './datasource.json';
/**
 * Schedule Default sample
 */
export class Default extends SampleBase {
  constructor() {
    super(...arguments);
    this.data = dataSource.scheduleData;
  }

  onBound(args) {
    // Data is already loaded from local datasource.json
  }

  onBegin(args) {
    if (args.requestType === 'eventCreate') {
      // Handle local data creation
      const newEvent = args.data[0];
      newEvent.Id = this.data.length + 1;
      this.data.push(newEvent);
      var schObj = document.querySelector('.e-schedule').ej2_instances[0];
      schObj.eventSettings.dataSource = [...this.data];
    } else if (args.requestType === 'eventChange') {
      // Handle local data update
      const updatedEvent = args.data;
      const index = this.data.findIndex(event => event.Id === updatedEvent.Id);
      if (index !== -1) {
        this.data[index] = updatedEvent;
      }
      var schObj = document.querySelector('.e-schedule').ej2_instances[0];
      schObj.eventSettings.dataSource = [...this.data];
    } else if (args.requestType === 'eventRemove') {
      // Handle local data deletion
      const deletedEvent = args.data[0];
      this.data = this.data.filter(event => event.Id !== deletedEvent.Id);
      var schObj = document.querySelector('.e-schedule').ej2_instances[0];
      schObj.eventSettings.dataSource = [...this.data];
    }
  }
  render() {
    return (
      <div className="schedule-control-section">
        <div className="col-lg-9 control-section">
          <div className="control-wrapper">
            <ScheduleComponent
              height="650px"
              ref={schedule => (this.scheduleObj = schedule)}
              currentView="Month"
              selectedDate={new Date(2020, 5, 10)}
              eventSettings={{ dataSource: this.data }}
              dataBound={this.onBound.bind(this)}
              actionBegin={this.onBegin.bind(this)}
            >
              <ViewsDirective>
                <ViewDirective option="Day" />
                <ViewDirective option="Week" />
                <ViewDirective option="WorkWeek" />
                <ViewDirective option="Month" />
                <ViewDirective option="Agenda" />
              </ViewsDirective>
              <Inject
                services={[
                  Day,
                  Week,
                  WorkWeek,
                  Month,
                  Agenda,
                  Resize,
                  DragAndDrop
                ]}
              />
            </ScheduleComponent>
          </div>
        </div>
      </div>
    );
  }
}

render(<Default />, document.getElementById('sample'));
