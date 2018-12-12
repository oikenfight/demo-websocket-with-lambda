<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">
                        received messages
                    </h4>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li v-for="message in receivedMessages" class="list-group-item">{{ message }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HomeLister',
        data () {
            return {
                receivedMessages: []
            }
        },
        mounted () {
            let es = new EventSource('https:/99e760b1.fanoutcdn.com/Prod/my_web_socket/');
            let that = this
            es.addEventListener('message', function (e) {
                that.receivedMessages.push(JSON.parse(e.data).text)
            }, false);
        },
    }
</script>

<style scoped>

</style>