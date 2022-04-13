export default function Blog(props){
    const {posts} = props;
    console.log(posts);
    return (
        <div>
            <p>Current Sample:</p>
            <h1>Update Data</h1><br></br>
            <p>Results: <br></br></p>
            <p>Status: {posts.Status}</p>
            <p>Message: {posts.Message}</p>
            <p>SQL Statement: {posts.SQL}</p><br></br>
        </div>
    )
}
/* 
Example for removing the last inserted data from DB with function.php by JQUERY AJAX
'Values', 'Columns' are useless in these cases, no need to set
This Example will execute the following SQL Statement:
    UPDATE marketplace SET Owner= ?, OnSale= ?, Price= ?, Collection_ID= ? WHERE NFT_ID = ?
*The values setting in attribute - "Values" will replace each question mark sequentially (do columns first, conditions last)
*/
export async function getStaticProps(context) {
    var test_value = "6, 0, 22, 1, 113"
    const res = await fetch("http://comp3334.test/DBTest/API/function.php", {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {Process:"UpdateData", Table: "TABLE_MARKET", Columns: "Owner, OnSale, Price, Collection_ID", Conditions: "NFT_ID = ?", Values: test_value,
                Orderby: null, Ordersort: null, Extra: null}),
    })
    const posts = await res.json();
    return{
        props: {posts}
    }
}