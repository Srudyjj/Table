const shortDescription = "short_description",
  qualifier = "target_qualifier",
  type = "target_qualifier",
  object = "target_object",
  partition = "target_partition",
  status = "status",
  autonomicType = "autonomic_type",
  priorityOverride = "priority_override_int",
  priority = "priority",
  windowName ="window_name",
  start = "startts";

const scheme = new Map();

scheme.set(shortDescription ,"Recommended Action");
scheme.set(qualifier ,"Database Name");
scheme.set(type ,"Resource Type");
scheme.set(object ,"TS / IS Name");
scheme.set(partition ,"Partition");
scheme.set(status ,"Status");
scheme.set(autonomicType ,"Autonomic Type");
scheme.set(priorityOverride ,"Priority Override");
scheme.set(priority ,"Priority");
scheme.set(windowName ,"Window Name");
scheme.set(start ,"Modified on");

export default scheme;