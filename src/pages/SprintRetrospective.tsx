
import React, { useState } from 'react';
import { useSprintContext } from '@/context/SprintContext';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import Transition from '@/components/animations/Transition';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';

interface RetrospectiveFormData {
  sprintId: string;
  wentWell: string;
  toImprove: string;
}

const SprintRetrospective: React.FC = () => {
  const { sprints, addRetrospective, retrospectives } = useSprintContext();
  const completedSprints = sprints.filter(sprint => new Date(sprint.endDate) < new Date());
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const form = useForm<RetrospectiveFormData>({
    defaultValues: {
      sprintId: '',
      wentWell: '',
      toImprove: '',
    },
  });

  const onSubmit = (data: RetrospectiveFormData) => {
    if (!data.sprintId) {
      toast.error('Please select a sprint');
      return;
    }

    addRetrospective({
      id: Date.now().toString(),
      sprintId: data.sprintId,
      wentWell: data.wentWell,
      toImprove: data.toImprove,
      createdAt: new Date().toISOString(),
    });

    toast.success('Retrospective added successfully!');
    form.reset();
  };

  const handleAccordionChange = (value: string) => {
    setExpandedItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <Transition className="container py-8 pb-24 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Sprint Retrospectives</h1>
        <p className="text-muted-foreground mt-1">Reflect on your completed sprints</p>
      </header>

      <div className="grid gap-8 md:grid-cols-7">
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">New Retrospective</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="sprintId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Sprint</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a completed sprint" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {completedSprints.length > 0 ? (
                            completedSprints.map(sprint => (
                              <SelectItem key={sprint.id} value={sprint.id}>
                                {sprint.name} ({format(new Date(sprint.endDate), "MMM d, yyyy")})
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              No completed sprints
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="wentWell"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What went well?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List the successes and achievements of this sprint..." 
                          className="min-h-[100px] resize-none" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="toImprove"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What could be improved?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Identify areas for improvement and potential solutions..." 
                          className="min-h-[100px] resize-none" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-taskify-blue to-taskify-violet hover:opacity-90"
                  disabled={completedSprints.length === 0}
                >
                  Submit Retrospective
                </Button>
              </form>
            </Form>
          </div>
        </div>
        
        <div className="md:col-span-4">
          <h2 className="text-xl font-semibold mb-4">Past Retrospectives</h2>
          
          {retrospectives.length > 0 ? (
            <Accordion type="multiple" value={expandedItems} className="space-y-4">
              {retrospectives.map((retro) => {
                const sprint = sprints.find(s => s.id === retro.sprintId);
                return (
                  <AccordionItem 
                    key={retro.id} 
                    value={retro.id}
                    className="border rounded-xl overflow-hidden shadow-sm bg-white"
                  >
                    <AccordionTrigger 
                      onClick={() => handleAccordionChange(retro.id)}
                      className="px-4 py-3 hover:no-underline"
                    >
                      <div className="flex items-center justify-between w-full text-left">
                        <div>
                          <h3 className="font-medium">{sprint?.name || "Unknown Sprint"}</h3>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(retro.createdAt), "MMM d, yyyy")}
                          </p>
                        </div>
                        <CalendarCheck className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-4 py-3 border-t">
                          <h4 className="text-sm font-medium mb-2">What went well:</h4>
                          <p className="text-sm whitespace-pre-line">{retro.wentWell}</p>
                        </div>
                        <div className="px-4 py-3 border-t bg-muted/30">
                          <h4 className="text-sm font-medium mb-2">What could be improved:</h4>
                          <p className="text-sm whitespace-pre-line">{retro.toImprove}</p>
                        </div>
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          ) : (
            <div className="text-center p-8 rounded-xl bg-muted/50">
              <h3 className="text-lg font-medium mb-2">No retrospectives yet</h3>
              <p className="text-muted-foreground">
                Complete a sprint and add a retrospective to see it here.
              </p>
            </div>
          )}
        </div>
      </div>
    </Transition>
  );
};

export default SprintRetrospective;
