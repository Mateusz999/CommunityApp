using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController() : BaseApiController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<PagedList<ActivityDTO,DateTime?>>> GetActivities([FromQuery]ActivityParams? activityParams )
    {
        return HandleResult( await Mediator.Send(new GetActivityList.Query {  Params = activityParams } )  ); // Mediator jest w klasie BaseApiController 
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ActivityDTO>> GetActivityDetail(string id)
    {

        return HandleResult(await Mediator.Send(new GetActivityDetails.Query { Id = id }));

    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
    {
        return HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto }));
    }


    [HttpPut("{id}")]
    //[Authorize(Policy = "IsActivityHost")]
    public async Task<ActionResult> EditActivity(string id,EditActivityDto activity)
    {
        activity.Id = id;
        return HandleResult(await Mediator.Send(new EditActivity.Command { ActivityDto = activity }));
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "IsActivityHost")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
    }

    [HttpPost("{id}/attend")]
    public async Task<ActionResult> Attend(string id ) {
        //return BadRequest("B³¹d podczas aktualizacji ");
        return HandleResult(await Mediator.Send(new UpdateAttendence.Command { Id = id }));
    }

}
