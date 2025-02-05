const { connect } = require('mssql');

const CONNECTION_STRING = 'server=host.docker.internal/sqlexpress,1433;database=siemensdb;user id=sa;password=sqlserver2024;TrustServerCertificate=True'

const getProducts = async () => {
    let pool;
    try {
        pool = await connect(CONNECTION_STRING);
        if (pool?.connected) {
            const result = await pool?.request().query('select * from products;')
            return result.recordset
        }
    } catch (error) {
        throw error
    } finally {
        pool?.close()
    }
}
getProducts()


const getProduct = async (id) => {
    let pool;
    try {
        pool = await connect(CONNECTION_STRING);
        if (pool.connected) {
            const result = await pool
                .request()
                .input('id', id)
                .query('select * from products where product_id = @id')
            return result.recordset
        }
    } catch (error) {
        throw error
    } finally {
        if (pool)
            pool.close()
    }
}

const addProduct = async (product) => {
    let pool;
    try {
        pool = await connect(CONNECTION_STRING);
        if (pool.connected) {
            const result = await pool
                .request()
                .input('name', product.product_name)
                .input('price', product.product_price)
                .input('desc', product.product_description)
                .query('insert into products(product_name,product_description,product_price) values(@name,@desc,@price)')

            return result.rowsAffected
        }
    } catch (error) {
        throw error
    } finally {
        pool?.close()
    }
}

const updateProduct = async (id, product) => {
    let pool;
    try {
        pool = await connect(CONNECTION_STRING);
        if (pool.connected) {
            const result = await pool
                .request()
                .input('id', product.product_id)
                .input('name', product.product_name)
                .input('price', product.product_price)
                .input('desc', product.product_description)
                .query('update products set product_name=@name,product_description=@desc,product_price=@price where product_id=@id')

            return result.rowsAffected
        }
    } catch (error) {
        throw error
    } finally {
        pool?.close()
    }
}

module.exports = { getProducts, getProduct, addProduct, updateProduct }