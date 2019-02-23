import React from 'react';
import App, { Container } from 'next/app';
import Link from 'next/link';
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import initsStore from '../app/store';


class MyApp extends App {
    static async getInitialProps({
        Component,
        ctx,
        store,
    }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return {pageProps};
    }

    render() {
        const {
            Component,
            pageProps,
            store,
        } = this.props;

        return (
            <Container>
                <Provider store={store}>
                    <div style={{
                        maxWidth: '960px',
                        margin: '50px auto'
                    }}>
                        <p>Header</p>
                        <Link href='/'>
                            <a>Homepage</a>
                        </Link>
                        <Component {...pageProps} />

                    </div>
                </Provider>
            </Container>
        );
    }
}

export default withRedux(initsStore)(MyApp);