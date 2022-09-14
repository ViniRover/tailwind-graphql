import { CheckCircle, Lock } from 'phosphor-react';
import { isPast, format } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'class' | 'live';
}

export function Lesson({ title, type, slug, availableAt }: LessonProps) {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const isLessonAvailable = isPast(availableAt);
  const availableDataFormatted = format(availableAt, "EEEE' • 'MMMM' 'qo' • 'h':'mm bbbb");
  const isActiveLesson = (paramSlug === slug && isLessonAvailable);

  return(
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">
        {availableDataFormatted}
      </span>

      <div className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors', {
        'bg-green-500': isActiveLesson,
      })}>
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={classNames('flex items-start gap-2 text-sm text-blue-500 font-medium', {
              'text-white': isActiveLesson,
              'text-blue-500': !isActiveLesson,
            })}>
              <CheckCircle size={20}/>
              Available content
            </span>
          ) : (
            <span className="flex items-start gap-2 text-sm text-orange-500 font-medium">
              <Lock size={20}/>
              Coming soon
            </span>
          )}

          <span className={classNames('text-xs rounded px-2 py-[0.125rem] text-white border font-bold', {
            'border-white': isActiveLesson,
            'border-green-300': !isActiveLesson,
          })}>
            {type === 'live' ? 'LIVE' : 'PRACTICAL CLASS'} 
          </span>
        </header>

        <strong className={classNames('mt-5 block', {
          'text-white': isActiveLesson,
          'text-gray-200': !isActiveLesson,
        })}>
          {title}
        </strong>
      </div>
    </Link>
  );
}