@extends('master')
@section('title', 'Page Title')
@section('content')
<div class="row">
    <div class="col-xs-12">
        <h2 class="title">Subscriber List</h2>
        <div class="search-form">
            <form class="form-inline" method="POST" action="/subscribers" autocomplete="off">
                @csrf
                <div class="form-group">
                    <div>
                        <label for="year">Birth Year</label>
                    </div>
                    <div>
                        <input type="number" name="year" class="form-control" id="year" placeholder="Birth year">
                    </div>
                </div>
                <div class="form-group">
                    <div>
                        <label for="month">Birth Month</label>
                    </div>
                    <div>
                        <input type="number" class="form-control" id="month" placeholder="Birth month">
                    </div>
                </div>
                <div class="form-group">
                    <div>
                        <label for="month">&nbsp;</label>
                    </div>
                    <div>
                        <button type="submit" class="btn btn-warning">Filter</button>
                    </div>
                </div>
            </form>
        </div>
        <div class="">
            <table class="table table-bordered table-bordered table-hover bg-white">
                <thead>
                    <tr>
                        <th colspan="7">
                            <div class="paging-wrapper text-right">
                                <span class="inline-block mr-30">100000 people in the list</span>
                                <span class="inline-block"><button class="btn btn-xm"><i class="glyphicon glyphicon-chevron-left"></i></button></span>
                                <span class="inline-block">20 of 5000</span>
                                <span class="inline-block"><button class="btn btn-xm"><i class="glyphicon glyphicon-chevron-right"></i></button></span>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Birthday</th>
                        <th>Phone</th>
                        <th>IP</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody id="list-of-subscriber"></tbody>
                <tfoot>
                    <tr>
                        <th colspan="7">
                            <div class="paging-wrapper text-right">
                                <span class="inline-block mr-30">100000 people in the list</span>
                                <span class="inline-block"><button class="btn btn-xm"><i class="glyphicon glyphicon-chevron-left"></i></button></span>
                                <span class="inline-block">20 of 5000</span>
                                <span class="inline-block"><button class="btn btn-xm"><i class="glyphicon glyphicon-chevron-right"></i></button></span>
                            </div>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</div>
<script type="text/x-tmpl" id="tmpl-subscribers">
    {% for (var i=0; i<o.length; i++) { %}
        <tr>
            <td>{%=o[i].id %}</td>
            <td>{%=o[i].email %}</td>
            <td>{%=o[i].name %}</td>
            <td>{%=o[i].birth_day %}</td>
            <td>{%=o[i].phone %}</td>
            <td>{%=o[i].ip %}</td>
            <td>{%=o[i].country %}</td>
        </tr>
    {% } %}
</script>
@stop