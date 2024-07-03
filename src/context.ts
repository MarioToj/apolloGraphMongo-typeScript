import UsersDataSource from "./datasources/UserDataSource"


export type DataSourceContext = {

    dataSources: {
        mongoDataSource: UsersDataSource;
    }
}