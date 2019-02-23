import React from 'react';
import fetch from 'node-fetch';
import Link from 'next/link';
import { Table } from 'semantic-ui-react';
import {fetchCards } from '../app/actions/cardActions';
import {connect} from 'react-redux';

class Search extends React.Component {
    
    static async getInitialProps({ store, query }) {
        const searchPhrase = query.q;
        const selectedFormat = query.f;
        await store.dispatch(fetchCards(selectedFormat, searchPhrase));

        return {
        
        };
    }

    render() {

        const rows = this.props.cards.results.length !==0 ?
            this.props.cards.results.map ( card => (
                <Table.Row key={card.id}>
                    <Table.Cell>
                        <Link href={{pathname: '/card', query: {id: card.id}}}>
                            <a>{card.name}</a>
                        </Link>
                    </Table.Cell>
                    <Table.Cell>{card.set_name}</Table.Cell>
                    <Table.Cell>{card.mana_cost}</Table.Cell>
                    <Table.Cell>{card.eur ? `${card.eur}E` : 'N/A'}</Table.Cell>
                </Table.Row>
            )) : [];

        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Set</Table.HeaderCell>
                        <Table.HeaderCell>Mana</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {rows}
                </Table.Body>
            </Table>
        );
    }
}

const mapStateToProps = state => ({
    cards: state.cards,
});

export default connect(mapStateToProps)(Search);