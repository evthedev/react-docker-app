import * as React from 'react'
import { Container, ContainerListItem } from './containerListItem'

export interface ContainerListProps {
    containers: Container[]
    title?: string
}

export class ContainerList extends React.Component<ContainerListProps, {}> {
    
    render() {
        return (
            <div>
                <h3>{this.props.title}</h3>
                <p>{ this.props.containers.length == 0 ? 'No containers bro' : '' }</p>
                <div className="row">
                    { this.props.containers.map(korntenah => <ContainerListItem key={korntenah.name} {...korntenah} />)}
                </div>
            </div>
        )
    }
}