import * as _ from 'lodash'
import * as React from 'react'
import * as io from 'socket.io-client'
import { ContainerListItem, Container } from './containerListItem'
import { ContainerList } from './containerList'

class AppStato {
    containers?: Container[]
    stoppedContainers?: Container[]
}

let socket = io.connect()

export class AppComponent extends React.Component<{}, AppStato> {

    constructor() {
        
        super()
        
        this.state = {
            containers: [],
            stoppedContainers: []
        }

        socket.on('containers.list', (containers: any) => {
            
            const partitioned = _.partition(containers, (korntenah: any) => korntenah.state == 'running')

            this.setState({
                containers: partitioned[0].map(this.mapContainer),
                stoppedContainers: partitioned[1].map(this.mapContainer)
            })
        }

    }
        
    render() {
        return (
            <div className="container">
                <h1 className="page-header">Docker Dashboard</h1>
                <ContainerList title="Running Containerz" containers={this.state.containers} />
                <ContainerList title="Stopped Containerz" containers={this.state.stoppedContainers} />
            </div>
        )
    }
}